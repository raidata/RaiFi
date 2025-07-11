// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
contract YieldVesting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    struct VestingEntry {
        uint256 totalReward;
        uint256 startTime;
        uint256 duration;
        uint256 releasedAmount;
        string rewardType;
    }
    mapping(address => mapping(uint256 => VestingEntry)) public vestingEntries;
    uint256 public nextVestingId = 1;
    mapping(address => uint256[]) internal userVestingIds;

    IERC20 public raiToken ;
    address public contributionRewardsContract;
    address public bondContractAddress;
    address public stakingContractAddress;

    event VestingAdded(address user, uint256 vestingId, uint256 amount, uint256 duration, string rewardType);
    event VestingReleased(address user, uint256 vestingId, uint256 amount, string rewardType);
    event ContractAddressSet(Contracts indexed contractType, address indexed oldAddress, address indexed newAddress);

    constructor(address _rai, address _contributionRewardsContract, address _bondContractAddress, address _stakingContractAddress)
    Ownable(msg.sender) {
        require( _rai != address(0), "Rai address cannot be zero" );
        raiToken = IERC20(_rai);
        require( _contributionRewardsContract != address(0), "Contribution Rewards address cannot be zero" );
        contributionRewardsContract = _contributionRewardsContract;
        require( _bondContractAddress != address(0), "BondContract address cannot be zero" );
        bondContractAddress=_bondContractAddress;
        require( _stakingContractAddress != address(0), "Staking contract address cannot be zero" );
        stakingContractAddress =_stakingContractAddress;
    }
    modifier onlyAuthorized() {
        require(msg.sender == contributionRewardsContract || msg.sender == bondContractAddress || msg.sender == stakingContractAddress || msg.sender == owner(), "Not authorized");
        _;
    }
    function addVestingEntry(address user, uint256 amount, uint256 duration, string memory rewardType) external onlyAuthorized {
        require(duration > 0, "Vesting duration must be greater than zero");
        uint256 vestingId = nextVestingId++;
        vestingEntries[user][vestingId] = VestingEntry({
            totalReward: amount,
            startTime: block.timestamp,
            duration: duration,
            releasedAmount: 0,
            rewardType: rewardType
        });
        userVestingIds[user].push(vestingId);
        emit VestingAdded(user, vestingId, amount, duration, rewardType);
    }
    function releaseVesting(address user, string memory rewardTypeFilter) external nonReentrant {
        uint256 balance = 0;
        uint256[] storage currentUserVestingIds = userVestingIds[user]; 
        bytes32 filterHash = keccak256(bytes(rewardTypeFilter));
        bool noFilter = (bytes(rewardTypeFilter).length == 0); 
        for (uint256 i = 0; i < currentUserVestingIds.length; i++) {
             uint256 vestingId = currentUserVestingIds[i]; 
            VestingEntry storage vesting = vestingEntries[user][vestingId]; 
            if (vesting.totalReward == 0 || 
                vesting.releasedAmount == vesting.totalReward || 
                (!noFilter && keccak256(bytes(vesting.rewardType)) != filterHash)) {
                continue;
            }
            if (block.timestamp >= vesting.startTime + vesting.duration) {
                uint256 remaining = vesting.totalReward - vesting.releasedAmount;
                if (remaining > 0) {
                    vesting.releasedAmount = vesting.totalReward;
                    balance = balance + remaining;
                    emit VestingReleased(user, i, remaining, vesting.rewardType);
                }
            }
            else {
                uint256 timeElapsed = block.timestamp - vesting.startTime;
                if(vesting.duration>0)
                {
                    uint256 releaseableAmount = (vesting.totalReward* timeElapsed)/vesting.duration  - vesting.releasedAmount;
                    if (releaseableAmount > 0) {
                        vesting.releasedAmount = vesting.releasedAmount + releaseableAmount;
                        balance = balance + releaseableAmount;
                        emit VestingReleased(user, i, releaseableAmount, vesting.rewardType);
                    }
                }
            }
        }
        if (balance > 0) {
            raiToken.safeTransfer(user, balance);
        }
    }
   function getUserVestingEntries(address user, string memory rewardTypeFilter) external view returns (VestingEntry[] memory) {
        uint256[] storage currentUserVestingIds = userVestingIds[user]; 
        uint256 count = 0;
        bytes32 filterHash = keccak256(bytes(rewardTypeFilter));
        bool noFilter = (bytes(rewardTypeFilter).length == 0);
        for (uint256 i = 0; i < currentUserVestingIds.length; i++) {
            uint256 vestingId = currentUserVestingIds[i];
            VestingEntry storage entry = vestingEntries[user][vestingId];
            if (entry.totalReward > 0 && (noFilter || keccak256(bytes(entry.rewardType)) == filterHash)) {
                count++;
            }
        }
        VestingEntry[] memory result = new VestingEntry[](count);
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < currentUserVestingIds.length; i++) {
            uint256 vestingId = currentUserVestingIds[i];
            VestingEntry storage entry = vestingEntries[user][vestingId];
            if (entry.totalReward > 0 && (noFilter || keccak256(bytes(entry.rewardType)) == filterHash)) {
                result[currentIndex] = entry;
                currentIndex++;
            }
        }
        return result;
    }
    
    
 
    enum Contracts { CONTRIBUTIONREWARDS, RAI, BOND, STAKING }

    /**
        @notice sets the contract address for LP staking
        @param contractType address
    */
    function setContract(Contracts contractType , address contractAddress ) external onlyOwner() {
        require(contractAddress != address(0), "Contract address cannot be zero" );
        address oldAddress;
        if ( contractType  == Contracts.CONTRIBUTIONREWARDS ) {
            oldAddress = contributionRewardsContract;
            contributionRewardsContract = contractAddress;
        } else if ( contractType  == Contracts.RAI ) {
            oldAddress = address(raiToken);
            raiToken = IERC20(contractAddress);
        }  else if( contractType  == Contracts.BOND){
            oldAddress = bondContractAddress;
            bondContractAddress = contractAddress;
        } else if( contractType  == Contracts.STAKING){
           oldAddress = stakingContractAddress;
           stakingContractAddress =contractAddress;
        }
        emit ContractAddressSet(contractType, oldAddress, contractAddress);
    }
    function sweepToken(address tokenAddress) external onlyOwner {
        IERC20 token= IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        token.safeTransfer(msg.sender, balance);
    }
    function migrateVestingEntries(address user,  uint256 totalRewards, uint256 startTimes, uint256 durations, uint256 releasedAmounts, string memory rewardTypes ) external onlyOwner {
        uint256 vestingId = nextVestingId++;
        vestingEntries[user][vestingId] = VestingEntry({
            totalReward: totalRewards,
            startTime: startTimes,
            duration: durations,
            releasedAmount: releasedAmounts,
            rewardType: rewardTypes
        });
        userVestingIds[user].push(vestingId);
        if (vestingId >= nextVestingId) {
            nextVestingId = vestingId + 1;
        }
    }
}