// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IRaiToken {
    function name() external view returns (string memory);
    function mint(address account, uint256 amount) external; 
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}
struct MintingResult {
    uint256 tokenId;
    uint128 liquidity;
    uint256 amount0;
    uint256 amount1;
}
interface IPancakeSwapV3Router {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }
    function exactInputSingle(ExactInputSingleParams memory params) external payable returns (uint256 amountOut);
}
interface INonfungiblePositionManager {
    struct MintParams {
        address token0;
        address token1;
        uint24 fee;
        int24 tickLower;
        int24 tickUpper;
        uint256 amount0Desired;
        uint256 amount1Desired;
        uint256 amount0Min;
        uint256 amount1Min;
        address recipient;
        uint256 deadline;
    }
  function mint(MintParams calldata params)
        external
        payable
        returns (
            uint256 tokenId,
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        );
    struct DecreaseLiquidityParams {
        uint256 tokenId;
        uint128 liquidity;
        uint256 amount0Min;
        uint256 amount1Min;
        uint256 deadline;
    }
    function decreaseLiquidity(DecreaseLiquidityParams calldata params)
        external
        payable
        returns (uint256 amount0, uint256 amount1);

    struct CollectParams {
        uint256 tokenId;
        address recipient;
        uint128 amount0Max;
        uint128 amount1Max;
    }
    function collect(CollectParams calldata params) external payable returns (uint256 amount0, uint256 amount1);

}

contract TreasuryContract is Ownable {
     using SafeERC20 for IERC20;
    // State variables
    INonfungiblePositionManager public positionManager;
    MintingResult[] public lpTreasury; 
    uint256 public totalTreasuryAssets;
    uint256 public usdtBalance;
    uint256 public lpUSDTBalance;

    address public swapRouterAddress;

    address public usdtAddress;
    address public bondContractAddress;
    address public rewardVestingContractAddress;
    mapping(uint256 => bool) public activeLPTokens;
    uint256[] public activeTokenIds;
    address public devWallet;

    IERC20 public usdtToken;
    IRaiToken public raiToken;
    IPancakeSwapV3Router public swapRouter;
    int24 public tickLower = -800000;
    int24 public tickUpper = 800000; 
    uint24 public fee=10000;// 1%;
    address public token0; 
    address public  token1;
    mapping(address => bool) public authorizedContracts;

    constructor(
        address _usdtTokenAddress,
        address _raiTokenAddress,
        address _bondContractAddress,
        address _rewardVestingContractAddress,
        address _devWallet,
        address _positionManagerAddress,
        address _swapRouterAddress
    )Ownable(msg.sender) {
        require(_usdtTokenAddress != address(0), "USDT token address cannot be zero");
        require(_raiTokenAddress != address(0), "RAI token address cannot be zero");
        require(_swapRouterAddress != address(0), "Swap router address cannot be zero");
        require(_positionManagerAddress != address(0), "Position manager address cannot be zero");
        require(_bondContractAddress != address(0), "Bond contract address cannot be zero");
        require(_rewardVestingContractAddress != address(0), "Reward vesting contract address cannot be zero");
        require(_devWallet != address(0), "Dev wallet address cannot be zero");

        usdtAddress =_usdtTokenAddress;
        token1 =_usdtTokenAddress;
        usdtToken = IERC20(_usdtTokenAddress);
        raiToken = IRaiToken(_raiTokenAddress);
        token0 =_raiTokenAddress;
        bondContractAddress = _bondContractAddress;
        rewardVestingContractAddress = _rewardVestingContractAddress;
        devWallet = _devWallet;
        positionManager = INonfungiblePositionManager(_positionManagerAddress);
        swapRouterAddress=_swapRouterAddress;
        swapRouter = IPancakeSwapV3Router(_swapRouterAddress);
    }
    
    function setLiquidity(int24 _tickLower, int24 _tickUpper,uint24 _fee, address _token0,address _token1 ) external onlyOwner() {
        require(_tickLower < _tickUpper, "Tick lower must be less than tick upper");
        require( _fee == 100 || _fee == 500 || _fee == 2500 || _fee == 10000, "Invalid fee amount for V3 pool" );
        require(_token0 != address(0), "Token0 address cannot be zero");
        require(_token1 != address(0), "Token1 address cannot be zero");
        require(_token0 != address(0), "Token0 address cannot be zero");
        require(_token1 != address(0), "Token1 address cannot be zero");
        require((_token0 == address(raiToken) && _token1 == address(usdtToken)) ||
            (_token0 == address(usdtToken) && _token1 == address(raiToken)),
            "Invalid token pair for liquidity pool");
        tickLower = _tickLower;
        tickUpper = _tickUpper;
        fee = _fee;
        token0 = _token0;
        token1 = _token1;
        emit LiquidityParametersChanged(_tickLower, _tickUpper, _fee, _token0, _token1);
    }
    function deposit(uint256 amountRAI, uint256 amountUSDT, bool isLiquidityBond) external {
        require(msg.sender == bondContractAddress, "Not Bond Contract");
        raiToken.mint(rewardVestingContractAddress, amountRAI);
        emit RAIMinted(rewardVestingContractAddress, amountRAI); 
        if(isLiquidityBond)
        {
            uint256 amountAction = amountUSDT/2;
            uint256 amountUSDTForLP = amountUSDT - amountAction; 
            usdtToken.approve(swapRouterAddress, type(uint256).max);
            IPancakeSwapV3Router.ExactInputSingleParams memory params = IPancakeSwapV3Router.ExactInputSingleParams({
                tokenIn: usdtAddress,
                tokenOut: address(raiToken),
                fee: fee,
                recipient: address(this), 
                deadline: block.timestamp + 300,
                amountIn: amountAction,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });
            uint256 RaiReceived = swapRouter.exactInputSingle(params);
            usdtToken.approve(address(positionManager), type(uint256).max);
            raiToken.approve(address(positionManager), type(uint256).max);
            uint256 amount0Desired = RaiReceived;
            uint256 amount1Desired = amountUSDTForLP;
            if(token1 == address(raiToken))
            {
                amount0Desired = amountUSDTForLP;
                amount1Desired = RaiReceived;
            }
            (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) = positionManager.mint(
                INonfungiblePositionManager.MintParams({
                    token0: token0,
                    token1: token1,
                    fee: fee,
                    tickLower: tickLower,
                    tickUpper: tickUpper,
                    amount0Desired: amount0Desired,
                    amount1Desired: amount1Desired,
                    amount0Min: 0,
                    amount1Min: 0,
                    recipient: address(this),
                    deadline: block.timestamp+300
                })
            );
            MintingResult memory result = MintingResult({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0: amount0,
                amount1: amount1
            });
            lpTreasury.push(result);
            activeLPTokens[tokenId] = true;
            activeTokenIds.push(tokenId);
            lpUSDTBalance += amountUSDT;
            emit LiquidityAdded(tokenId, RaiReceived, amountUSDTForLP);
        }
        else 
        {
            usdtBalance += amountUSDT;
        }
        totalTreasuryAssets += amountUSDT;
        emit USDTReceived(msg.sender, amountUSDT);
    }
    function getActiveTokenIds() external view returns (uint256[] memory) {
        return activeTokenIds;
    }
    function _collectLPFeesAndDistribute(uint256 _tokenId) internal returns (uint256 amount0Collected, uint256 amount1Collected) {
        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager.CollectParams({
            tokenId: _tokenId,
            recipient: address(this),
            amount0Max: type(uint128).max,
            amount1Max: type(uint128).max
        });
        (amount0Collected, amount1Collected) = positionManager.collect(params);

        if (amount0Collected > 0) {
            IERC20(token0).safeTransfer(devWallet, amount0Collected);
        }
        if (amount1Collected > 0) {
            IERC20(token1).safeTransfer(devWallet, amount1Collected);
        }
        emit LP_FeesCollectedAndSent(_tokenId, amount0Collected, amount1Collected, devWallet);
    }
    function receiveLPFee(uint256 _tokenId) external onlyAuthorized {
        require(activeLPTokens[_tokenId], "LP token not active or not managed by Treasury");
        _collectLPFeesAndDistribute(_tokenId);
    }
    function removeLiquidityV3(uint256 tokenId,uint128 liquidity) external onlyOwner {
       _collectLPFeesAndDistribute(tokenId);
        positionManager.decreaseLiquidity(
            INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            })
        );
        activeLPTokens[tokenId] = false; 
        emit LiquidityRemoved(tokenId, liquidity);
    }
    // Function to interact with other contracts
    function setAuthorizedContracts(address contractAddress, bool isAuthorized) external onlyOwner {
        authorizedContracts[contractAddress] = isAuthorized;
    }
    // Access control modifier
    modifier onlyAuthorized() {
        require(authorizedContracts[msg.sender], "Not authorized");
        _;
    }
    enum Contracts { USDTTOKEN, RAITOKEN, SWAPROUTER, POSITIONMANAGER, BOND, REWARDVESTING, DEVWALLET }

    /**
     * @notice sets the contract address for LP staking
     * @param _contract address
     */
    function setContract( Contracts _contract, address _address ) external onlyOwner() {
         require(_address != address(0), "Contract address cannot be zero");
        if( _contract == Contracts.USDTTOKEN ) { 
            usdtAddress =_address;
            usdtToken = IERC20(_address);
        } else if ( _contract == Contracts.RAITOKEN ) { 
            raiToken = IRaiToken(_address);
        } else if ( _contract == Contracts.SWAPROUTER ) { 
            swapRouterAddress = _address;
            swapRouter = IPancakeSwapV3Router(_address);
        }else if ( _contract == Contracts.POSITIONMANAGER ) { 
             positionManager = INonfungiblePositionManager(_address);
        }  else if ( _contract == Contracts.BOND ) { 
            bondContractAddress = _address;
        } else if ( _contract == Contracts.REWARDVESTING ) { 
            rewardVestingContractAddress = _address;
        } else if ( _contract == Contracts.DEVWALLET ) {
            devWallet = _address;
        } 
        emit ContractSet(_contract, _address);
    }
    function sweepToken(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.safeTransfer(msg.sender, balance);
    }
    event LiquidityParametersChanged(int24 indexed tickLower, int24 indexed tickUpper, uint24 fee, address token0, address token1);
    event LP_FeesCollectedAndSent(uint256 indexed tokenId, uint256 amount0Collected, uint256 amount1Collected, address indexed devWalletRecipient);
    event USDTReceived(address indexed from, uint256 amount);
    event RAIMinted(address indexed to, uint256 amount); 
    event LiquidityAdded(uint256 tokenId, uint256 amountRAI, uint256 amountUSDT); 
    event LiquidityRemoved(uint256 indexed tokenId, uint128 indexed liquidityRemoved); 
    event ContractSet(Contracts indexed contractType, address indexed newAddress); 
}        