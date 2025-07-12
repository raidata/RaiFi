// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;


interface IContributionValueRewardsContract {
     function totalContributionValue(address) external view returns (uint256);
     function saleContributionValue(address) external view returns (uint256);
}

contract Community {
    struct MemberInfo {
        uint256 level;
        address referrer;
        address[] referrals;
    }
    mapping(address => MemberInfo) public members;
    mapping(address => bool) public isMember;
    address public immutable owner;
    address public contributionValueAddress; 
    IContributionValueRewardsContract public contributionValueContract;

    event MemberJoined(address indexed member, address indexed referrer);
    event ReferrerUpdated(address indexed member, address indexed oldReferrer, address indexed newReferrer);
    event ContractUpdated(address indexed oldContract, address indexed newContract, address indexed by);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

   constructor(address _contributionValueAddress) {
        owner = msg.sender;
        contributionValueAddress = _contributionValueAddress;
        contributionValueContract = IContributionValueRewardsContract(_contributionValueAddress);
    }
    function setContract(address newStaking) external onlyOwner {
        require(newStaking != address(0), "Staking contract address cannot be zero.");
        address oldStakingContract = contributionValueAddress; 
        contributionValueAddress = newStaking;
        contributionValueContract = IContributionValueRewardsContract(contributionValueAddress);
        emit ContractUpdated(oldStakingContract, newStaking, msg.sender);
    }
    function joinCommunity(address referrer) external {
        require(!isMember[msg.sender], "Member already joined.");
        require(msg.sender != referrer, "Cannot refer yourself.");
        require(!_isReferrerInReferralChain(msg.sender, referrer), "Cannot create a circular referral.");

        MemberInfo memory newMember = MemberInfo({
            level: 1,
            referrer: referrer,
            referrals: new address[](0)
        });

        members[msg.sender] = newMember;
        isMember[msg.sender] = true;

        members[referrer].referrals.push(msg.sender);
        emit MemberJoined(msg.sender, referrer);
    }

    function _isReferrerInReferralChain(address _member, address _potentialReferrer) internal view returns (bool) {
        address current = members[_member].referrer;
        uint depthLimit = 100;
        while (current != address(0)) {
            if (depthLimit == 0) { 
                break;
            }
            if (current == _potentialReferrer) {
                return true;
            }
            current = members[current].referrer;
            depthLimit--; 
        }
        return false;
    }

    function updateReferrer(address newReferrer) external {
        require(isMember[msg.sender], "Not a member yet.");
        require(msg.sender != newReferrer, "Cannot refer yourself.");
        require(!_isReferrerInReferralChain(msg.sender, newReferrer), "Cannot create a circular referral."); 

        address oldReferrer = members[msg.sender].referrer;
        if (oldReferrer != address(0)) {
            address[] storage oldReferralsArray = members[oldReferrer].referrals; 
            for (uint i = 0; i < oldReferralsArray.length; i++) {
                if (oldReferralsArray[i] == msg.sender) {
                    oldReferralsArray[i] = oldReferralsArray[oldReferralsArray.length - 1];
                    oldReferralsArray.pop();
                    break; 
                }
            }
        }

        members[msg.sender].referrer = newReferrer;
        // Add to new referrer's referrals
        if (isMember[newReferrer]) {
            members[newReferrer].referrals.push(msg.sender);
        }
        emit ReferrerUpdated(msg.sender, oldReferrer, newReferrer);
    }

    function levelOf(address member) public view returns (uint256) {
        if(!isMember[member]) {
            return 0;
        }
        return members[member].level;
    }

    function referrerOf(address member) external view returns (address) {
        if(!isMember[member]) {
            return address(0);
        }
        return members[member].referrer;
    }

    function referralsOf(address member) public view returns (address[] memory) {
        if(!isMember[member]) {
          return new address[](0);
        }
        return members[member].referrals;
    }
    function getReferralCounts(address member) public view returns (uint directCount, uint fullTreeCount,uint fullstake, uint fullcontribution) {
        require(isMember[member], "Not a member.");
        directCount = members[member].referrals.length;
        uint rootstake = contributionValueContract.saleContributionValue(member);
        uint rootcontribution = contributionValueContract.totalContributionValue(member);
        (fullTreeCount, fullcontribution) = _getFullReferralTreeStakeInternal(member);
        return (directCount, fullTreeCount, rootstake,fullcontribution + rootcontribution);
    }
    
    function _getFullReferralTreeStakeInternal(address member) internal view returns (uint totalCount, uint totalContribution) {
        uint count = 1;
        uint contribution = contributionValueContract.totalContributionValue(member);
        address[] memory directReferrals = members[member].referrals;
        for (uint i = 0; i < directReferrals.length; i++) {
            if (directReferrals[i] == address(0)) { 
                continue; 
            }
            (uint subTreeCount,  uint subTreeContribution) = _getFullReferralTreeStakeInternal(directReferrals[i]);
            count += subTreeCount;
            contribution += subTreeContribution;
        }
        return (count, contribution);
    }
    // Owner can update member level (for potential future use)
    function updateMemberLevel(address member, uint256 level) external onlyOwner {
        require(isMember[member], "Not a member.");
        members[member].level = level;
    }
    function getFullReferralTreeWithStakeInfo(address rootMember) public view returns (string memory) {
        require(isMember[rootMember], "Root member is not in the community.");
        bytes memory json = bytes('[');
        address[] memory directReferrals = members[rootMember].referrals;
        for (uint i = 0; i < directReferrals.length; i++) {
            address ref = directReferrals[i];
            bytes memory referralJSON = bytes('{ "address": "');
            referralJSON = abi.encodePacked(referralJSON, bytes(addressToString(ref)));
            referralJSON = abi.encodePacked(referralJSON, bytes('", "level": '));
            referralJSON = abi.encodePacked(referralJSON, bytes(uint256ToString(members[ref].level)));
            referralJSON = abi.encodePacked(referralJSON, bytes(', "stake": "'));
            referralJSON = abi.encodePacked(referralJSON, bytes(uint256ToString(contributionValueContract.saleContributionValue(ref))));
            referralJSON = abi.encodePacked(referralJSON, bytes('", "contribution": "'));
            referralJSON = abi.encodePacked(referralJSON, bytes(uint256ToString(contributionValueContract.totalContributionValue(ref))));
            referralJSON = abi.encodePacked(referralJSON, bytes('" }'));
            json = abi.encodePacked(json, referralJSON);
            if (i < directReferrals.length - 1) {
                json = abi.encodePacked(json, bytes(','));
            }
        }
        json = abi.encodePacked(json, bytes(']'));
        return string(json);
    }
    function addressToString(address addr) internal pure returns (string memory) {
        bytes memory b = abi.encodePacked(addr);
        string memory s = '';
        for (uint i = 0; i < b.length; i++) {
            uint bytedata = uint8(b[i]);
            bytes1 char1 = bytes1(uint8(bytedata >> 4));
            bytes1 char2 = bytes1(uint8(bytedata & 0x0f));
            s = string(abi.encodePacked(s, _uintToHexChar(uint8(char1)), _uintToHexChar(uint8(char2))));
        }
        return string(abi.encodePacked("0x", s));
    }
    function _uintToHexChar(uint8 c) internal pure returns (bytes1) {
        bytes memory  hexChars = "0123456789abcdef";
        return hexChars[uint(c)];
    }
    function uint256ToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        return string(buffer);
    }

    function updateReferrer(address member, address newReferrer) external onlyOwner{
        require(isMember[member], "Not a member yet.");
        require(member != newReferrer, "Cannot refer yourself.");
        require(!_isReferrerInReferralChain(member, newReferrer), "Cannot create a circular referral."); 

        address oldReferrer = members[member].referrer;
        if (oldReferrer != address(0)) {
            address[] storage oldReferralsArray = members[oldReferrer].referrals; 
            for (uint i = 0; i < oldReferralsArray.length; i++) {
                if (oldReferralsArray[i] == member) {
                    oldReferralsArray[i] = oldReferralsArray[oldReferralsArray.length - 1];
                    oldReferralsArray.pop();
                    break; 
                }
            }
        }
        members[member].referrer = newReferrer;
        // Add to new referrer's referrals
        if (isMember[newReferrer]) {
            members[newReferrer].referrals.push(member);
        }
    }
    function migrateMembersData(address member, uint256 level, address referrer) external onlyOwner {
        if (!isMember[member]) {
            members[member] = MemberInfo({
                level: level,
                referrer: referrer,
                referrals: new address[](0)
            });
            isMember[member] = true;
        }
    }
    function MigratedReferralsData(address referrer, address[] memory newReferrals) external onlyOwner {
        for (uint i = 0; i < newReferrals.length; i++) {
            address newRef = newReferrals[i];
            bool found = false;
            for (uint j = 0; j < members[referrer].referrals.length; j++) {
                if (members[referrer].referrals[j] == newRef) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                members[referrer].referrals.push(newRef);
            }
        }
    }
}        