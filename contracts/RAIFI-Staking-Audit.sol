// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@pancakeswap/v3-periphery/contracts/interfaces/IQuoterV2.sol";

interface IsRAI {
    function rebase( uint256 distribute, uint epoch_) external;
    function index() external view returns ( uint );
    function mint(address account, uint256 amount) external;
    function burn(address account, uint256 amount) external;
}

interface IWarmup {
    function retrieve( address staker_, uint amount_ ) external;
}

interface IYieldVestingContract {
    function addVestingEntry( address user, uint256 amount, uint256 duration, string memory rewardType ) external;
}
interface IRaiToken {
    function name() external view returns (string memory);
    function mint(address account, uint256 amount) external; 
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract StakingRAI is Ownable { 
    using SafeERC20 for IERC20;
    address public rai;
    address public sRai;
    event Staked (address indexed staker, uint256 amount);
    event Principal (address indexed staker, uint256 amount);
    event Forfeited (address indexed staker, uint256 amount);
    event Unstaked(address indexed staker, uint amount);
    event Apyed(address indexed staker, uint amount);
    event EpochUpdated(uint indexed newLength, uint indexed newNumber, uint newEndBlock, uint newMinRebase, uint newMaxRebase);
    event RebaseTriggered(uint indexed epochNumber, uint actualDistributeAmount, uint circulatingSupply_sRAI);
    event ContractAddressSet(Contracts indexed contractType, address indexed oldAddress, address indexed newAddress);
    event WarmupPeriodSet(uint indexed oldPeriod, uint indexed newPeriod);

    struct Epoch {
        uint length;
        uint number;
        uint endBlock;
        uint distribute;
        uint minRebase;
        uint maxRebase;
    }

    Epoch public epoch;

    address public usdtToken;
    address public daoContract;
    address public yieldVestingContract;

    address public warmupContract;
    uint public warmupPeriod;
    address public stakingLong;
    IQuoterV2 public quoterV2;

    constructor (
        address _rai,
        address _sRai,
        uint _epochLength,
        uint _firstEpochNumber,
        uint _firstEpochBlock,
        address _warmupContract,
        address _yieldVestingContract,
        address _usdtToken,
        address _daoContract,
        address _stakingLong,
        address _quoterAddress
    ) Ownable(msg.sender) { // Gọi constructor của Ownable
        require(_rai != address(0), "RAI address cannot be zero"); 
        rai = _rai;
        require(_sRai != address(0), "sRAI address cannot be zero"); 
        sRai = _sRai;
        require(_warmupContract != address(0), "Warmup contract address cannot be zero"); 
        warmupContract=_warmupContract;
        require(_yieldVestingContract != address(0), "Yield Vesting Contract contract address cannot be zero"); 
        yieldVestingContract = _yieldVestingContract;
        require(_usdtToken != address(0), "Usdt contract address cannot be zero"); 
        usdtToken = _usdtToken;
        require(_daoContract != address(0), "Dao contract address cannot be zero"); 
        daoContract = _daoContract;
        require(_stakingLong != address(0), "Staking Long contract address cannot be zero"); 
        stakingLong = _stakingLong;
        require(_daoContract != address(0), "Dao contract address cannot be zero"); 
        quoterV2 = IQuoterV2(_quoterAddress);
        epoch = Epoch({
            length: _epochLength,
            number: _firstEpochNumber,
            endBlock: _firstEpochBlock,
            distribute: 0,
            minRebase:5,
            maxRebase:3
        });
    }
    struct Claim {
        uint deposit;
        uint gons;
        uint expiry;
        bool lock; // prevents malicious delays
    }
    mapping( address => Claim ) public warmupInfo;
    mapping( address => uint256) public principal;

    /**
        @notice stake RAI to enter warmup
        @param _amount uint
        @return bool
    */
    function stake( uint _amount) external returns ( bool ) {
        IERC20( rai ).safeTransferFrom( msg.sender, address(this), _amount );
        Claim memory info = warmupInfo[ msg.sender ];
        require( !info.lock, "Deposits for account are locked" );
        uint256 gonsAmount = (_amount * 1e18) / IsRAI(sRai).index();
        warmupInfo[ msg.sender ] = Claim ({
            deposit: info.deposit +  _amount,
            gons: info.gons + gonsAmount,
            expiry: epoch.number + warmupPeriod,
            lock: false
        });
        IsRAI( sRai ).mint(warmupContract, _amount );
        emit Staked( msg.sender, _amount );

        principal[msg.sender] += _amount;
        emit Principal(msg.sender,  principal[msg.sender] );
        return true;
    }

    /**
        @notice retrieve sRAI from warmup
    */
    function claim () public {
        Claim memory info = warmupInfo[msg.sender];
        if ( epoch.number >= info.expiry && info.expiry != 0 ) {
            delete warmupInfo[ msg.sender ];
             uint256 lastIndex = IsRAI( sRai ).index();
             uint256 actualAmount = (info.gons * lastIndex) / 1e18;
            IWarmup( warmupContract ).retrieve( msg.sender, actualAmount );
        }
    }
    /**
        @notice prevent new deposits to address (protection from malicious activity)
    */
    function toggleDepositLock() external {
        warmupInfo[ msg.sender ].lock = !warmupInfo[ msg.sender ].lock;
    }
    /**
        @notice redeem sRAI for RAI
        @param _amount uint
    */
    function unstake( uint _amount) external {
        uint principalAmt = principal[msg.sender];
        require(principalAmt >= _amount,"NotEnoughPrincipal");
        principal[msg.sender] = principalAmt - _amount;
        IsRAI(sRai).burn(msg.sender, _amount );
        IERC20(rai).safeTransfer(msg.sender, _amount);
        emit Principal(msg.sender, principal[msg.sender]);
        emit Unstaked(msg.sender,_amount);
    }
    function ClaimApy( uint _amount, uint duration) external {
        uint principalAmt = principal[msg.sender];
         Claim memory infoWarmup = warmupInfo[ msg.sender ];
        uint256 gonsAmount = (infoWarmup.gons * 1e18) * IsRAI(sRai).index();
        uint total = IERC20(sRai).balanceOf(msg.sender) + gonsAmount ;
        require(total > principalAmt && total - principalAmt >= _amount ,"NotEnoughsRai");
        IsRAI(sRai).burn(msg.sender, _amount);
        uint256 discountPercentage = 25;
        uint vestingday = 30;
        if (duration == 30) {
            discountPercentage = 25;
            vestingday = duration;
        } else if (duration == 60) {
            discountPercentage = 20;
            vestingday = duration;
        } else if (duration == 100) {
            discountPercentage = 10;
            vestingday = duration;
        } else if (duration == 150) {
            discountPercentage = 5;
            vestingday = duration;
        } else if (duration == 150) {
            discountPercentage = 5;
            vestingday = duration;
        } else if (duration == 150) {
            discountPercentage = 5;
            vestingday = duration;
        } else if (duration == 180) {
            discountPercentage = 0;
            vestingday = duration;
        } 
        if(discountPercentage>0)
        {
            uint256 discountAmount = (_amount * discountPercentage)/100;
            uint256 price = getPriceToken(1e18, rai, usdtToken, 10000);
            uint256 fee = (discountAmount*price)/1e18;
            IERC20(usdtToken).safeTransferFrom(msg.sender, daoContract, fee);
        }
        IYieldVestingContract(yieldVestingContract).addVestingEntry(msg.sender, _amount, vestingday * 1 days, "Interest");
        emit Apyed(msg.sender,_amount);
    }
     function getPriceToken(uint256 amountIn, address tokenIn, address tokenOut, uint24 poolFee) public returns (uint256 amountOut) {
        IQuoterV2.QuoteExactInputSingleParams memory params = IQuoterV2.QuoteExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            amountIn: amountIn,
            fee: poolFee,
            sqrtPriceLimitX96: 0
        }) ;
        (amountOut, , ,) = quoterV2.quoteExactInputSingle(params);
        return amountOut;
    }
    /**
        @notice returns the sRAI index, which tracks rebase growth
        @return uint
    */
    function index() public view returns ( uint ) {
        return IsRAI( sRai ).index();
    }

    /**
        @notice trigger rebase if epoch over
    */
    function rebase() public {
        if( epoch.endBlock <= block.number ) {
            uint staked = circulatingsRaiSupply();
            uint distributeAmount = epoch.distribute;
            uint maxDistribute = staked * epoch.maxRebase / 1000; 
            if (distributeAmount > maxDistribute) {
                distributeAmount = maxDistribute;
            }
            if(distributeAmount>0)
            {
                IsRAI(sRai).rebase(distributeAmount, epoch.number);
                uint256 mintBonus = distributeAmount * 2;
                IRaiToken(rai).mint(yieldVestingContract, mintBonus);
            }

            epoch.endBlock = epoch.endBlock + epoch.length;
            epoch.number++;

            rebaseHistory[epoch.number] = RebaseInfo({
                timestamp: block.timestamp,
                distributeAmount: distributeAmount, 
                circulatingSupply_sRAI: staked
            });
            uint balance = contractBalance();
            if( balance <= staked ) {
                epoch.distribute = staked * epoch.minRebase / 10000;
            } 
            else {
                epoch.distribute = balance - staked;
                uint maxDistributeNext = staked * epoch.maxRebase / 1000; 
                if (epoch.distribute  > maxDistributeNext) {
                    epoch.distribute = maxDistributeNext;
                }
            }
            emit RebaseTriggered(epoch.number, distributeAmount, staked); 
        }
    }
    /**
        @notice returns contract RAI holdings, including longStake provided
        @return uint
    */
    function contractBalance() public view returns ( uint ) {
       return IERC20( rai ).balanceOf( address(this) ) + IERC20( rai ).balanceOf(stakingLong);
    }
    /**
        @notice returns total RAI staked in contract, including bonuses provided
        @return uint256
    */
    function circulatingsRaiSupply() public view returns (uint256) {
        uint256 totalSupply_sRAI = IERC20(sRai).totalSupply();
        return totalSupply_sRAI;
    }
    function sweepToken(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        token.safeTransfer(msg.sender, balance);
    }
    enum Contracts { WARMUP, YIELDVESTING , RAI, SRAI , USDTTOKEN, DAO, STAKINGLONG, QUOTER }

    /**
        @notice sets the contract address for LP staking
        @param _contract address
    */
    function setContract( Contracts _contract, address _address ) external onlyOwner { 
        require( _address != address(0), "Contract address cannot be zero" );
        address oldAddress;
        if ( _contract == Contracts.WARMUP ) { 
            oldAddress = warmupContract;
            warmupContract = _address;
        } 
        else if ( _contract == Contracts.YIELDVESTING ) { 
            oldAddress = yieldVestingContract;
            yieldVestingContract = _address;
        } 
        else if(_contract == Contracts.SRAI){
            oldAddress = sRai;
            sRai = _address;
        }
        else if(_contract == Contracts.RAI){
            oldAddress = rai;
            rai = _address;
        }
        else if( _contract == Contracts.USDTTOKEN ) { 
            oldAddress = usdtToken;
            usdtToken = _address;
        }
        else if(_contract == Contracts.DAO){
            oldAddress = daoContract;
           daoContract = _address;
        } 
        else if(_contract == Contracts.STAKINGLONG){
            oldAddress = stakingLong;
           stakingLong = _address;
        } else if ( _contract == Contracts.QUOTER ) { 
           quoterV2 = IQuoterV2(_address);
        }
        emit ContractAddressSet(_contract, oldAddress, _address);
    }

    /**
     * @notice set warmup period for new stakers
     * @param _warmupPeriod uint
     */
    function setWarmup( uint _warmupPeriod ) external onlyOwner { 
        uint oldPeriod = warmupPeriod; 
        warmupPeriod = _warmupPeriod;
        emit WarmupPeriodSet(oldPeriod, _warmupPeriod);
    }
    function updateEpoch( uint _epochLength,uint _firstEpochNumber ,uint _firstEpochBlock,uint _minRebase,uint _maxRebase  ) external onlyOwner { 
        epoch.length =_epochLength;
        epoch.number = _firstEpochNumber;
        epoch.endBlock = _firstEpochBlock;
        epoch.minRebase =_minRebase;
        epoch.maxRebase =_maxRebase;
        emit EpochUpdated(_epochLength, _firstEpochNumber, _firstEpochBlock, _minRebase, _maxRebase);
    }
    function principalStakedRAI(address user) external view returns (uint256) {
        return principal[user];
    }
    function getEpochDistribute() external view returns (uint256) {
        return epoch.distribute;
    }
    struct RebaseInfo {
        uint timestamp;
        uint distributeAmount;
        uint circulatingSupply_sRAI;
    }
    mapping(uint256 => RebaseInfo) public rebaseHistory;
    function getTotalDistributeAmountLast24Hours() public view returns (uint256 totalAmount) {
        uint256 currentTime = block.timestamp;
        uint256 oneDayAgo = currentTime - (24 * 3600);
        uint256 currentEpoch = epoch.number;
        totalAmount = 0;
        for (uint256 i = currentEpoch; i > 0; i--) {
            RebaseInfo memory info = rebaseHistory[i];
            if (info.timestamp >= oneDayAgo) {
                totalAmount = totalAmount + info.distributeAmount;
            } else {
                break;
            }
            if (i == 1) break;
        }
        return totalAmount;
    }
    function migratePrincipal(address user, uint256 principalAmount) external onlyOwner {
        principal[user] = principalAmount;
    }
    function migrateWarmup(address user, uint deposit, uint gons,uint expiry) external onlyOwner {
        warmupInfo[user] = Claim ({
            deposit: deposit,
            gons: gons,
            expiry: expiry,
            lock: false
        });
    }
}