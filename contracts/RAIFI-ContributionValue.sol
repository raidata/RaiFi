// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@pancakeswap/v3-periphery/contracts/interfaces/IQuoterV2.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IStakingContract {
    function principalStakedRAI(address user) external view returns (uint256);
}

interface IYieldVestingContract {
    function addVestingEntry( address user, uint256 amount, uint256 duration, string memory rewardType ) external;
}
interface IRAIToken {
    function burn(uint256 amount) external;
    function burnFrom(address account_, uint256 amount_) external;
}
interface ILongStakingRAI {
     function principal(address) external view returns (uint256);
}
contract ContributionValueRewardsContract is Ownable {
    // --- External Contracts ---
    IStakingContract public stakingContract;
    ILongStakingRAI public stakingLongContract;
    IYieldVestingContract public yieldVestingContract;
    IRAIToken public raiToken;
    IERC20 public usdtToken;
    address public daoContract;
    address public bondContract;
    IQuoterV2 public quoterV2;

    // --- Constants ---
    uint256 public constant CONTRIBUTION_WEIGHT_REWARD_PERCENT = 10;
    uint256 public constant DAILY_NEW_CONTRIBUTION_REWARD_PERCENT = 7;
    uint256 public constant BOND_SALES_INCENTIVE_PERCENT = 5;
    uint256 public constant BOND_INCENTIVE_VESTING_DURATION_DAYS = 5;
    uint256 public constant REWARD_LIMIT_MULTIPLIER = 4;
    uint256 public  MaximumStakedPrincipal = 5000e18;

    //-- private data
    uint256 raiDecimals = 18; 
    uint256 usdDecimals = 18;

    mapping(address => uint256) public contributionWeightRewardsEarned;
    mapping(address => uint256) public dailyNewContributionRewardsEarned;
    mapping(address => uint256) public contributionRankingRewardsEarned;
    mapping(address => uint256) public totalContributionValueRewardsEarned;
    mapping(address => uint256) public totalBondIncentiveRewardsEarned;
    mapping(address => uint256) public minimumDestruction;

    mapping(address => uint256) public totalContributionValue;
    mapping(address => uint256) public saleContributionValue;

    uint256 public Time_Day = 1 days;

    mapping(address => uint256) public burnUser; 
    mapping(address => mapping(address => uint256)) public referrals; // referrer => buyer => bondValue
    struct RewardRecord {
        string rewardType; // Loại hoa hồng (ví dụ: "ContributionValue", "Weight", "Top99", "BondIncentive")
        uint256 amount;
        uint256 timestamp;
    }
    mapping(address => RewardRecord[]) public rewardHistory;
    function _recordRewardHistory(address user, string memory rewardType, uint256 amount) internal {
        rewardHistory[user].push(RewardRecord({
            rewardType: rewardType,
            amount: amount,
            timestamp: block.timestamp
        }));
    }
    // --- Modifiers ---
    modifier onlyOwnerRole() {
        require(msg.sender == bondContract || msg.sender == address(stakingContract) || msg.sender == owner(), "Only staking contract can call this function");
        _;
    }

    // --- Constructor ---
    constructor(
        address _stakingContract,
        address _yieldVestingContract,
        address _raiToken,
        address _usdtToken,
        address _daoContract,
        address _stakingLongContract,
         address _bondContract,
        address _quoterAddress

    ) Ownable(msg.sender) {
        stakingContract = IStakingContract(_stakingContract);
        yieldVestingContract = IYieldVestingContract(_yieldVestingContract);
        raiToken = IRAIToken(_raiToken);
        usdtToken = IERC20(_usdtToken);
        daoContract = _daoContract;
        stakingLongContract = ILongStakingRAI(_stakingLongContract);
        bondContract = _bondContract;
        quoterV2 = IQuoterV2(_quoterAddress);
    }
    function setMaximumStakedPrincipal(uint256 maximumStakedPrincipal) external onlyOwner{
        MaximumStakedPrincipal = maximumStakedPrincipal;
    }
    function checkRewardLimit(address user, uint256 rewardAmount) internal view returns (uint256) {
        uint256 initialStake = stakingContract.principalStakedRAI(user) + stakingLongContract.principal(user);
        if (initialStake == 0) return 0; // Cannot earn if no initial stake
        if(initialStake > MaximumStakedPrincipal)
        {
            initialStake = MaximumStakedPrincipal;
        }
        uint256 totalBoned = contributionWeightRewardsEarned[user] + dailyNewContributionRewardsEarned[user] + contributionRankingRewardsEarned[user] + totalBondIncentiveRewardsEarned[user];
        uint256 totalEarned = rewardAmount + totalBoned;
        uint256 maxbonus = (initialStake + burnUser[user])* REWARD_LIMIT_MULTIPLIER;
        uint256 values = 0;
        if(totalEarned < maxbonus){
            values = rewardAmount;
        }
        else if(totalEarned > maxbonus && totalBoned < maxbonus){
            values = maxbonus - totalBoned;
        } 
        return values;
    }
    function _distributeReward(address user, uint256 amount, uint256 vestingDurationDays) internal {
        if (amount > 0) {
            yieldVestingContract.addVestingEntry(user, amount, vestingDurationDays,"Contribution");
        }
    }
    //========================================================
    //------contributionWeightRewardsEarned
    //========================================================
    function calculateWeightRewards(address user, uint256 reward) external onlyOwner{
        uint256 avaiablReward = checkRewardLimit(user, reward);
        if (avaiablReward > 0) {
            contributionWeightRewardsEarned[user]=contributionWeightRewardsEarned[user] + reward;
            totalContributionValueRewardsEarned[user] = totalContributionValueRewardsEarned[user] + reward;
            _recordRewardHistory(user, "Weight Reward", reward); 
            emit WeightRewardsCalculated(user, reward);
        }
    }
    function updateSaleContributionValue(address user, uint256 newSalenValue) external onlyOwner{
        saleContributionValue[user] = newSalenValue;
    }
    function updateContributionValue(address user, uint256 newContributionValue) external onlyOwner{
        totalContributionValue[user] = newContributionValue;
    }
    address[] public top99Addresses;
    mapping(address => uint256) public top99Values; 
    function setTop99Ranking(address[] calldata _topAddresses, uint256[] calldata _topValues) external onlyOwner {
        require(_topAddresses.length == _topValues.length, "Arrays length mismatch");
        top99Addresses = new address[](_topAddresses.length);
        for (uint i = 0; i < _topAddresses.length; i++) {
            top99Addresses[i] = _topAddresses[i];
            top99Values[_topAddresses[i]] = _topValues[i]; 
        }
    }
    function getTop99Contributors() external view returns (address[] memory _topAddresses, uint256 _minValue) {
        _topAddresses = new address[](top99Addresses.length);
        _minValue = type(uint256).max; 
        for (uint i = 0; i < top99Addresses.length; i++) {
            _topAddresses[i] = top99Addresses[i];
            if (top99Values[top99Addresses[i]] < _minValue) {
                _minValue = top99Values[top99Addresses[i]];
            }
        }
        return (_topAddresses, _minValue);
    }
    function calculatetop99Reward(address user,uint256 reward) external onlyOwner{
        uint256 avaiablReward = checkRewardLimit(user, reward);
        if (avaiablReward > 0) {
            contributionRankingRewardsEarned[user]=contributionRankingRewardsEarned[user] + reward;
            totalContributionValueRewardsEarned[user] = totalContributionValueRewardsEarned[user] + reward;
            _recordRewardHistory(user, "Rank Reward", reward);
        }
    }
    //=========================================================
    //----Start Daily New Contribution Value Rewards
    //=========================================================
    function calculateDailyNewReward(address user,uint256 reward) external onlyOwner{
        uint256 avaiablReward = checkRewardLimit(user, reward);
        if (avaiablReward > 0) {
            dailyNewContributionRewardsEarned[user]=dailyNewContributionRewardsEarned[user] + reward;
            totalContributionValueRewardsEarned[user] = totalContributionValueRewardsEarned[user] + reward;
            _recordRewardHistory(user, "New Reward", reward); 
        }
    }
    //========================================================
    // --- Start Dynamic Earnings 2: Bond Sales Incentive Rewards
    //========================================================
    struct BondPurchaseRecord {
        address referrer;
        address buyer;
        uint256 bondValue;
        uint256 reward;
        uint256 timestamp;
    }
    mapping(address => BondPurchaseRecord[]) public bondPurchaseHistory;

    function recordBondPurchase(address referrer, address buyer, uint256 bondValue) external onlyOwnerRole{
        referrals[referrer][buyer] = referrals[referrer][buyer] + bondValue;
        uint256 reward = (bondValue * BOND_SALES_INCENTIVE_PERCENT) / 100;
        uint256 avaiablReward = checkRewardLimit(referrer, reward);
        if (avaiablReward > 0) {
            BondPurchaseRecord memory record = BondPurchaseRecord({
            referrer: referrer,
            buyer: buyer,
            bondValue: bondValue,
            reward: reward,
            timestamp: block.timestamp
            });
            bondPurchaseHistory[referrer].push(record);
            _distributeReward(referrer, avaiablReward , BOND_INCENTIVE_VESTING_DURATION_DAYS*Time_Day);
            totalBondIncentiveRewardsEarned[referrer] = totalBondIncentiveRewardsEarned[referrer] + avaiablReward;
            _recordRewardHistory(referrer, "Bond Reward", avaiablReward);
        }
    }
    function getRewardHistory(address user) external view returns (RewardRecord[] memory) {
        return rewardHistory[user];
    }
    function getBondPurchaseHistory(address user) public view returns (BondPurchaseRecord[] memory) {
        return bondPurchaseHistory[user];
    }

    event BondPurchaseFeeApplied(address buyer, uint256 totalFee, uint256 burnAmount, uint256 ecosystemAmount);
    
    enum CONTRACTS { STAKING, YIELDVESTING, QUOTER, RAI, USDT, DAO,STAKINGLONG, BOND }

    /**
        @notice sets the contract address for LP staking
        @param _contract address
    */
    function setContract( CONTRACTS _contract, address _address ) external onlyOwner() {
        require( _address != address(0), "Contract address cannot be zero" );
        if( _contract == CONTRACTS.STAKING ) { 
            stakingContract = IStakingContract(_address);
        } else if ( _contract == CONTRACTS.YIELDVESTING ) { 
            yieldVestingContract = IYieldVestingContract(_address);
        } else if ( _contract == CONTRACTS.QUOTER ) { 
           quoterV2 = IQuoterV2(_address);
        } else if(_contract == CONTRACTS.RAI){
            raiToken = IRAIToken(_address);
        } else if(_contract == CONTRACTS.USDT){
           usdtToken = IERC20(_address);
        }  else if(_contract == CONTRACTS.DAO){
           daoContract = _address;
        }  else if(_contract == CONTRACTS.STAKINGLONG){
           stakingLongContract = ILongStakingRAI(_address);
        }  else if(_contract == CONTRACTS.BOND){
           bondContract = _address;
        } 
        
    }
    function getContributionWeightRewardsEarned(address user) external view returns (uint256) {
        return contributionWeightRewardsEarned[user];
    }

    function getDailyNewContributionRewardsEarned(address user) external view returns (uint256) {
        return dailyNewContributionRewardsEarned[user];
    }

    function getContributionRankingRewardsEarned(address user) external view returns (uint256) {
        return contributionRankingRewardsEarned[user];
    }

    function getTotalBondIncentiveRewardsEarned(address user) external view returns (uint256) {
        return totalBondIncentiveRewardsEarned[user];
    }
    function destroyed(uint amount) external  {
        require(amount > 0, "Amount must be greater than zero");
        raiToken.burnFrom(msg.sender, amount);
        burnUser[msg.sender] = burnUser[msg.sender] + amount;
        if(minimumDestruction[msg.sender]>0)
        {
            minimumDestruction[msg.sender] -=  amount;
        }
        if(minimumDestruction[msg.sender] <0 )
        {
            minimumDestruction[msg.sender] = 0;
        }
    }
    function withdrawRewardWithDiscount(uint typeBurn, uint256 withdrawDays) external  {
        uint256 amountToWithdraw = totalContributionValueRewardsEarned[msg.sender];
        if(amountToWithdraw>0)
        {
            uint256 discountPercentage = 0;
            if (withdrawDays == 30) {
                discountPercentage = 25;
            } else if (withdrawDays == 60) {
                discountPercentage = 20;
            } else if (withdrawDays == 100) {
                discountPercentage = 10;
            } else if (withdrawDays == 150) {
                discountPercentage = 5;
            } 
            totalContributionValueRewardsEarned[msg.sender] = 0;
            uint256 discountAmount = (amountToWithdraw * discountPercentage)/100;
            if(typeBurn==1)
            {
                uint256 amountAfterDiscount = amountToWithdraw - discountAmount;
                if(amountAfterDiscount>0)
                {
                    _distributeReward(msg.sender, amountAfterDiscount, withdrawDays*Time_Day); 
                }
            }
            else 
            {
                if(discountAmount>0)
                {
                    uint256 price = getPriceToken(1e18, address(raiToken), address(usdtToken), 10000);
                    uint256 fee=(discountAmount*price)/1e18;
                    require(fee>0,"Insufficient balance");
                    usdtToken.transferFrom(msg.sender, daoContract, fee);
                }
                _distributeReward(msg.sender, amountToWithdraw, withdrawDays*Time_Day); 
            }
            emit RewardWithdrawn(msg.sender,amountToWithdraw,discountPercentage,typeBurn,withdrawDays);
        }
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
    event ContributionValueUpdated(address user, uint256 newValue);
    event WeightRewardsCalculated(address user, uint256 reward);
    event RewardWithdrawn(address user, uint256 amount, uint256 discountPercentage, uint typeBurn, uint256 withdrawDays);

    // migrate data
    function migrateContributionWeightRewardsEarned(address user, uint256 amount) external onlyOwner {
        contributionWeightRewardsEarned[user] = amount;
    }

    function migrateDailyNewContributionRewardsEarned(address user, uint256 amount) external onlyOwner {
        dailyNewContributionRewardsEarned[user] = amount;
    }

    function migrateContributionRankingRewardsEarned(address user, uint256 amount) external onlyOwner {
        contributionRankingRewardsEarned[user] = amount;
    }

    function migrateTotalContributionValueRewardsEarned(address user, uint256 amount) external onlyOwner {
        totalContributionValueRewardsEarned[user] = amount;
    }

    function migrateTotalBondIncentiveRewardsEarned(address user, uint256 amount) external onlyOwner {
        totalBondIncentiveRewardsEarned[user] = amount;
    }

    function migrateTotalContributionValue(address user, uint256 amount) external onlyOwner {
        totalContributionValue[user] = amount;
    }
    function migrateBurnUser(address user, uint256 amount) external onlyOwner {
        burnUser[user] = amount;
    }
    function migrateRewardHistory(address user, string memory rewardType, uint256 amount, uint256 timestamp) external onlyOwner {
        rewardHistory[user].push(RewardRecord({
                rewardType: rewardType,
                amount: amount,
                timestamp: timestamp
            }));
    }
}