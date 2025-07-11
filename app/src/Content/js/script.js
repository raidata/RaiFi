var raiwapp = angular.module('raiwapp', ['pascalprecht.translate', 'tmh.dynamicLocale', 'ngCookies', 'ngSanitize']);
var servicelink = 'https://services.raifi.ai/';
var readOnlyProviderUrl = 'https://rpc-mainnet.u2u.xyz';
var desiredChainIdHex = '0x27';
var desiredChainId = 39;
var desiredChainName = 'U2U Solaris Mainnet';
var rpcUrls = ['https://rpc-mainnet.u2u.xyz'];
var networkNativeCurrency = {
    name: 'U2U Solaris',
    symbol: 'U2U',
    decimals: 18,
};
var networkBlockExplorerUrls = ['https://u2uscan.xyz/'];
var raiContractAddress = '0xBE957d14CA6Ae36Ea9025420368caae01Fd59198';
var raiContractABI = [{ "inputs": [{ "internalType": "address", "name": "account_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" }], "name": "_burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint8", "name": "ratioType", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "ratio", "type": "uint256" }], "name": "FeeRatioChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "feeReceiver", "type": "address" }, { "indexed": false, "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "FeeReceiverRoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isBuy", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "left", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "fee", "type": "uint256" }], "name": "FeeTaken", "type": "event" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account_", "type": "address" }, { "internalType": "uint256", "name": "amount_", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }], "name": "MintRoleGranted", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_feeReceiver", "type": "address" }], "name": "setFeeReceiver", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "name": "setMainPair", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "setMintRole", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint8", "name": "ratioType", "type": "uint8" }, { "internalType": "uint256", "name": "ratio", "type": "uint256" }], "name": "setRatio", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyFeeRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "COOLING_PROTECTOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeReceiver", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "INTERN_SYSTEM", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "mainPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINT", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nameToken", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "PRECISION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sellFeeRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbolToken", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];

var sRaiContractAddress = '0x53AB9E66f63CD7D491B26202A3dC09374ff7846f';
var sRaiContractABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_stakingContract", "type": "address" }, { "internalType": "address", "name": "_warmupContract", "type": "address" }, { "internalType": "address", "name": "_stakingLongContract", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }], "name": "ERC20InsufficientAllowance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "needed", "type": "uint256" }], "name": "ERC20InsufficientBalance", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "approver", "type": "address" }], "name": "ERC20InvalidApprover", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }], "name": "ERC20InvalidReceiver", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }], "name": "ERC20InvalidSender", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }], "name": "ERC20InvalidSpender", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "burner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum sRAI.CONTRACTS", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressUpdated", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "bool", "name": "_paused", "type": "bool" }], "name": "pauseRebase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "distribute", "type": "uint256" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" }], "name": "rebase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "distribute", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "circulatingSupply", "type": "uint256" }], "name": "Rebase", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bool", "name": "paused", "type": "bool" }], "name": "RebasePaused", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum sRAI.CONTRACTS", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rebaseIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rebasePaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingLongContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var stakingAddressOld = '0x6AB6A950748599BAce00ADF15Ae1f26f2b34A812';
var stakingContractABIOld = [{ "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_rai", "type": "address" }, { "internalType": "address", "name": "_sRai", "type": "address" }, { "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "address", "name": "_warmupContract", "type": "address" }, { "internalType": "address", "name": "_community", "type": "address" }, { "internalType": "address", "name": "_yieldVestingContract", "type": "address" }, { "internalType": "address", "name": "_usdtToken", "type": "address" }, { "internalType": "address", "name": "_daoContract", "type": "address" }, { "internalType": "address", "name": "_stakingLong", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum StakingRAI.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "newLength", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEndBlock", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMinRebase", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxRebase", "type": "uint256" }], "name": "EpochUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Forfeited", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "principalAmount", "type": "uint256" }], "name": "migratePrincipal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }], "name": "migrateWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Principal", "type": "event" }, { "inputs": [], "name": "rebase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epochNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "actualDistributeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "name": "RebaseTriggered", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum StakingRAI.Contracts", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }], "name": "setWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "stake", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "toggleDepositLock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_trigger", "type": "bool" }, { "internalType": "bool", "name": "_isPrincipal", "type": "bool" }, { "internalType": "uint256", "name": "burnAmt", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "isPrincipal", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "_maxRebase", "type": "uint256" }], "name": "updateEpoch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "oldPeriod", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newPeriod", "type": "uint256" }], "name": "WarmupPeriodSet", "type": "event" }, { "inputs": [], "name": "circulatingsRaiSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "community", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "epoch", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "internalType": "uint256", "name": "distribute", "type": "uint256" }, { "internalType": "uint256", "name": "minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "maxRebase", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getEpochDistribute", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalDistributeAmountLast24Hours", "outputs": [{ "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "principal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "principalStakedRAI", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rebaseHistory", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "distributeAmount", "type": "uint256" }, { "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sRai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingLong", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "warmupInfo", "outputs": [{ "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldVestingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var stakingAddressOld1 = '0xF682589fEC3Fea4926de5B4Edd15ff2E13E01ed3';
var stakingContractABIOld1 = [{ "inputs": [{ "internalType": "address", "name": "_rai", "type": "address" }, { "internalType": "address", "name": "_sRai", "type": "address" }, { "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "address", "name": "_warmupContract", "type": "address" }, { "internalType": "address", "name": "_yieldVestingContract", "type": "address" }, { "internalType": "address", "name": "_usdtToken", "type": "address" }, { "internalType": "address", "name": "_daoContract", "type": "address" }, { "internalType": "address", "name": "_stakingLong", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "isPrincipal", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Apyed", "type": "event" }, { "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum StakingRAI.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "newLength", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEndBlock", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMinRebase", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxRebase", "type": "uint256" }], "name": "EpochUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Forfeited", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "principalAmount", "type": "uint256" }], "name": "migratePrincipal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }], "name": "migrateWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Principal", "type": "event" }, { "inputs": [], "name": "rebase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epochNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "actualDistributeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "name": "RebaseTriggered", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum StakingRAI.Contracts", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }], "name": "setWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "stake", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "toggleDepositLock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_trigger", "type": "bool" }, { "internalType": "bool", "name": "_isPrincipal", "type": "bool" }, { "internalType": "uint256", "name": "burnAmt", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "_maxRebase", "type": "uint256" }], "name": "updateEpoch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "oldPeriod", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newPeriod", "type": "uint256" }], "name": "WarmupPeriodSet", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "apyHistory", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "circulatingsRaiSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "epoch", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "internalType": "uint256", "name": "distribute", "type": "uint256" }, { "internalType": "uint256", "name": "minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "maxRebase", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getEpochDistribute", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalDistributeAmountLast24Hours", "outputs": [{ "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "principal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "principalStakedRAI", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rebaseHistory", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "distributeAmount", "type": "uint256" }, { "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sRai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakeHistory", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingLong", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "unstakeHistory", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "uint256", "name": "epoch", "type": "uint256" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "warmupInfo", "outputs": [{ "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldVestingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var stakingAddress = '0x0058EE94bB8092fF44E2DF7C88CaD33b2A26C2E8';
var stakingContractABI = [{ "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "ClaimApy", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "poolFee", "type": "uint24" }], "name": "getPriceToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "principalAmount", "type": "uint256" }], "name": "migratePrincipal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }], "name": "migrateWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_rai", "type": "address" }, { "internalType": "address", "name": "_sRai", "type": "address" }, { "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "address", "name": "_warmupContract", "type": "address" }, { "internalType": "address", "name": "_yieldVestingContract", "type": "address" }, { "internalType": "address", "name": "_usdtToken", "type": "address" }, { "internalType": "address", "name": "_daoContract", "type": "address" }, { "internalType": "address", "name": "_stakingLong", "type": "address" }, { "internalType": "address", "name": "_quoterAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Apyed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum StakingRAI.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "newLength", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newEndBlock", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMinRebase", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxRebase", "type": "uint256" }], "name": "EpochUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Forfeited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Principal", "type": "event" }, { "inputs": [], "name": "rebase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "epochNumber", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "actualDistributeAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "name": "RebaseTriggered", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum StakingRAI.Contracts", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }], "name": "setWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "stake", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "toggleDepositLock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_epochLength", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochNumber", "type": "uint256" }, { "internalType": "uint256", "name": "_firstEpochBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "_maxRebase", "type": "uint256" }], "name": "updateEpoch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "oldPeriod", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "newPeriod", "type": "uint256" }], "name": "WarmupPeriodSet", "type": "event" }, { "inputs": [], "name": "circulatingsRaiSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "epoch", "outputs": [{ "internalType": "uint256", "name": "length", "type": "uint256" }, { "internalType": "uint256", "name": "number", "type": "uint256" }, { "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "internalType": "uint256", "name": "distribute", "type": "uint256" }, { "internalType": "uint256", "name": "minRebase", "type": "uint256" }, { "internalType": "uint256", "name": "maxRebase", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getEpochDistribute", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalDistributeAmountLast24Hours", "outputs": [{ "internalType": "uint256", "name": "totalAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "index", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "principal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "principalStakedRAI", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "quoterV2", "outputs": [{ "internalType": "contract IQuoterV2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rebaseHistory", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "distributeAmount", "type": "uint256" }, { "internalType": "uint256", "name": "circulatingSupply_sRAI", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sRai", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingLong", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "warmupInfo", "outputs": [{ "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldVestingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var stakingLongAddress = '0x8cde2ACFE301D26643B493aA9Fce6E652Eff25C9';
var stakingLongABI = [{ "inputs": [], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "ClaimXCoin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "string", "name": "_description", "type": "string" }], "name": "depositXCoin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_RAI", "type": "address" }, { "internalType": "address", "name": "_sRAI", "type": "address" }, { "internalType": "address", "name": "_warmupContract", "type": "address" }, { "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }, { "internalType": "address", "name": "_staking", "type": "address" }, { "internalType": "address", "name": "_xCoinAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Principal", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum LongStakingRAI.CONTRACTS", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_warmupPeriod", "type": "uint256" }], "name": "setWarmup", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "uint256", "name": "_durationDays", "type": "uint256" }], "name": "stake", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "durationDays", "type": "uint256" }], "name": "Staked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_stakeId", "type": "uint256" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "staker", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "stakeId", "type": "uint256" }], "name": "Unstaked", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_stakeId", "type": "uint256" }], "name": "getStakeInfo", "outputs": [{ "components": [{ "internalType": "uint256", "name": "stakeId", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "durationDays", "type": "uint256" }, { "internalType": "bool", "name": "isWithdrawn", "type": "bool" }], "internalType": "struct LongStakingRAI.StakeInfo", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getUserStakedAmounts", "outputs": [{ "internalType": "uint256", "name": "total30Days", "type": "uint256" }, { "internalType": "uint256", "name": "total90Days", "type": "uint256" }, { "internalType": "uint256", "name": "total180Days", "type": "uint256" }, { "internalType": "uint256", "name": "total365Days", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getUserStakeIds", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getXCoinTransactionHistory", "outputs": [{ "components": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isDeposit", "type": "bool" }, { "internalType": "string", "name": "description", "type": "string" }], "internalType": "struct LongStakingRAI.XCoinTransaction[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "principal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sRAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "staking", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userStakeIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userStakes", "outputs": [{ "internalType": "uint256", "name": "stakeId", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "durationDays", "type": "uint256" }, { "internalType": "bool", "name": "isWithdrawn", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "warmupInfo", "outputs": [{ "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "internalType": "uint256", "name": "gons", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "bool", "name": "lock", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "warmupPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "xCoin", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "xCoinBalanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "xCoinTransactionHistory", "outputs": [{ "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "bool", "name": "isDeposit", "type": "bool" }, { "internalType": "string", "name": "description", "type": "string" }], "stateMutability": "view", "type": "function" }];

var treasuryContractAddress = '0x0534E7069f085390bdB63291fEe7C46fB580298c';
var treasuryContractABI = [{ "inputs": [{ "internalType": "address", "name": "_usdtTokenAddress", "type": "address" }, { "internalType": "address", "name": "_raiTokenAddress", "type": "address" }, { "internalType": "address", "name": "_bondContractAddress", "type": "address" }, { "internalType": "address", "name": "_rewardVestingContractAddress", "type": "address" }, { "internalType": "address", "name": "_devWallet", "type": "address" }, { "internalType": "address", "name": "_positionManagerAddress", "type": "address" }, { "internalType": "address", "name": "_swapRouterAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum TreasuryContract.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractSet", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amountRAI", "type": "uint256" }, { "internalType": "uint256", "name": "amountUSDT", "type": "uint256" }, { "internalType": "bool", "name": "isLiquidityBond", "type": "bool" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Collected", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Collected", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "devWalletRecipient", "type": "address" }], "name": "LP_FeesCollectedAndSent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountRAI", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountUSDT", "type": "uint256" }], "name": "LiquidityAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int24", "name": "tickLower", "type": "int24" }, { "indexed": true, "internalType": "int24", "name": "tickUpper", "type": "int24" }, { "indexed": false, "internalType": "uint24", "name": "fee", "type": "uint24" }, { "indexed": false, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": false, "internalType": "address", "name": "token1", "type": "address" }], "name": "LiquidityParametersChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": true, "internalType": "uint128", "name": "liquidityRemoved", "type": "uint128" }], "name": "LiquidityRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "RAIMinted", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_tokenId", "type": "uint256" }], "name": "receiveLPFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint128", "name": "liquidity", "type": "uint128" }], "name": "removeLiquidityV3", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "contractAddress", "type": "address" }, { "internalType": "bool", "name": "isAuthorized", "type": "bool" }], "name": "setAuthorizedContracts", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum TreasuryContract.Contracts", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "int24", "name": "_tickLower", "type": "int24" }, { "internalType": "int24", "name": "_tickUpper", "type": "int24" }, { "internalType": "uint24", "name": "_fee", "type": "uint24" }, { "internalType": "address", "name": "_token0", "type": "address" }, { "internalType": "address", "name": "_token1", "type": "address" }], "name": "setLiquidity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "USDTReceived", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "activeLPTokens", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "activeTokenIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "authorizedContracts", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bondContractAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "devWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fee", "outputs": [{ "internalType": "uint24", "name": "", "type": "uint24" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getActiveTokenIds", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "lpTreasury", "outputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint128", "name": "liquidity", "type": "uint128" }, { "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lpUSDTBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "positionManager", "outputs": [{ "internalType": "contract INonfungiblePositionManager", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "raiToken", "outputs": [{ "internalType": "contract IRaiToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardVestingContractAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapRouter", "outputs": [{ "internalType": "contract IPancakeSwapV3Router", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapRouterAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tickLower", "outputs": [{ "internalType": "int24", "name": "", "type": "int24" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "tickUpper", "outputs": [{ "internalType": "int24", "name": "", "type": "int24" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalTreasuryAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalTreasuryRiskFreeAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var principleAddress = '0xA99cf32e9aAa700f9E881BA9BF2C57A211ae94df';
var principleContractABI = [{ "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "guy", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src", "internalType": "address" }, { "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad", "internalType": "uint256" }] }];

var communityContractAddress = '0x1665bdD34Ac3fFd5F4217502e5e8e266AA5af1Cc';
var communityContractABI = [{ "inputs": [{ "internalType": "address", "name": "_contributionValueAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "oldContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newContract", "type": "address" }, { "indexed": true, "internalType": "address", "name": "by", "type": "address" }], "name": "ContractUpdated", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "referrer", "type": "address" }], "name": "joinCommunity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "member", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }], "name": "MemberJoined", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address[]", "name": "newReferrals", "type": "address[]" }], "name": "MigratedReferralsData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }, { "internalType": "uint256", "name": "level", "type": "uint256" }, { "internalType": "address", "name": "referrer", "type": "address" }], "name": "migrateMembersData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "member", "type": "address" }, { "indexed": true, "internalType": "address", "name": "oldReferrer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newReferrer", "type": "address" }], "name": "ReferrerUpdated", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "newStaking", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }, { "internalType": "uint256", "name": "level", "type": "uint256" }], "name": "updateMemberLevel", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }, { "internalType": "address", "name": "newReferrer", "type": "address" }], "name": "updateReferrer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newReferrer", "type": "address" }], "name": "updateReferrer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "contributionValueAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contributionValueContract", "outputs": [{ "internalType": "contract IContributionValueRewardsContract", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "rootMember", "type": "address" }], "name": "getFullReferralTreeWithStakeInfo", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }], "name": "getReferralCounts", "outputs": [{ "internalType": "uint256", "name": "directCount", "type": "uint256" }, { "internalType": "uint256", "name": "fullTreeCount", "type": "uint256" }, { "internalType": "uint256", "name": "fullstake", "type": "uint256" }, { "internalType": "uint256", "name": "fullcontribution", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "isMember", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }], "name": "levelOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "members", "outputs": [{ "internalType": "uint256", "name": "level", "type": "uint256" }, { "internalType": "address", "name": "referrer", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }], "name": "referralsOf", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "member", "type": "address" }], "name": "referrerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var contributionContractAddress = '0xafa38aC89e92DCdBbE8d365aD566a4D0DF7Bf6f1';
var contributionContractABI = [{ "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "calculateDailyNewReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "calculatetop99Reward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateBurnUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_stakingContract", "type": "address" }, { "internalType": "address", "name": "_yieldVestingContract", "type": "address" }, { "internalType": "address", "name": "_raiToken", "type": "address" }, { "internalType": "address", "name": "_usdtToken", "type": "address" }, { "internalType": "address", "name": "_daoContract", "type": "address" }, { "internalType": "address", "name": "_stakingLongContract", "type": "address" }, { "internalType": "address", "name": "_bondContract", "type": "address" }, { "internalType": "address", "name": "_quoterAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "totalFee", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "burnAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "ecosystemAmount", "type": "uint256" }], "name": "BondPurchaseFeeApplied", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "calculateWeightRewards", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newValue", "type": "uint256" }], "name": "ContributionValueUpdated", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "destroyed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "poolFee", "type": "uint24" }], "name": "getPriceToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateContributionRankingRewardsEarned", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateContributionWeightRewardsEarned", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateDailyNewContributionRewardsEarned", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "string", "name": "rewardType", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "migrateRewardHistory", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateTotalBondIncentiveRewardsEarned", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateTotalContributionValue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "migrateTotalContributionValueRewardsEarned", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "bondValue", "type": "uint256" }], "name": "recordBondPurchase", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "discountPercentage", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "typeBurn", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "withdrawDays", "type": "uint256" }], "name": "RewardWithdrawn", "type": "event" }, { "inputs": [{ "internalType": "enum ContributionValueRewardsContract.CONTRACTS", "name": "_contract", "type": "uint8" }, { "internalType": "address", "name": "_address", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "maximumStakedPrincipal", "type": "uint256" }], "name": "setMaximumStakedPrincipal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "_topAddresses", "type": "address[]" }, { "internalType": "uint256[]", "name": "_topValues", "type": "uint256[]" }], "name": "setTop99Ranking", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "newContributionValue", "type": "uint256" }], "name": "updateContributionValue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "newSalenValue", "type": "uint256" }], "name": "updateSaleContributionValue", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "WeightRewardsCalculated", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "typeBurn", "type": "uint256" }, { "internalType": "uint256", "name": "withdrawDays", "type": "uint256" }], "name": "withdrawRewardWithDiscount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "BOND_INCENTIVE_VESTING_DURATION_DAYS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BOND_SALES_INCENTIVE_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bondContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "bondPurchaseHistory", "outputs": [{ "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "bondValue", "type": "uint256" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "burnUser", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "CONTRIBUTION_WEIGHT_REWARD_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "contributionRankingRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "contributionWeightRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DAILY_NEW_CONTRIBUTION_REWARD_PERCENT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "dailyNewContributionRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getBondPurchaseHistory", "outputs": [{ "components": [{ "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "bondValue", "type": "uint256" }, { "internalType": "uint256", "name": "reward", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "internalType": "struct ContributionValueRewardsContract.BondPurchaseRecord[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getContributionRankingRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getContributionWeightRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getDailyNewContributionRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getRewardHistory", "outputs": [{ "components": [{ "internalType": "string", "name": "rewardType", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "internalType": "struct ContributionValueRewardsContract.RewardRecord[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTop99Contributors", "outputs": [{ "internalType": "address[]", "name": "_topAddresses", "type": "address[]" }, { "internalType": "uint256", "name": "_minValue", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "getTotalBondIncentiveRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MaximumStakedPrincipal", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "minimumDestruction", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "quoterV2", "outputs": [{ "internalType": "contract IQuoterV2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "raiToken", "outputs": [{ "internalType": "contract IRAIToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "referrals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "REWARD_LIMIT_MULTIPLIER", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "rewardHistory", "outputs": [{ "internalType": "string", "name": "rewardType", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "saleContributionValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingContract", "outputs": [{ "internalType": "contract IStakingContract", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingLongContract", "outputs": [{ "internalType": "contract ILongStakingRAI", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Time_Day", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "top99Addresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "top99Values", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalBondIncentiveRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalContributionValue", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalContributionValueRewardsEarned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldVestingContract", "outputs": [{ "internalType": "contract IYieldVestingContract", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var bondContractAddress = '0x0de44AAef57036748888c4cEe5110b235938ec6d';
var bondContractABI = [{ "inputs": [{ "internalType": "address", "name": "_rai", "type": "address" }, { "internalType": "address", "name": "_principle", "type": "address" }, { "internalType": "address", "name": "_treasury", "type": "address" }, { "internalType": "address", "name": "_DAO", "type": "address" }, { "internalType": "address", "name": "_quoterAddress", "type": "address" }, { "internalType": "address", "name": "_sRAI", "type": "address" }, { "internalType": "address", "name": "_yieldVestingContract", "type": "address" }, { "internalType": "address", "name": "_contributionValueRewardsContract", "type": "address" }, { "internalType": "address", "name": "_staking", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "deposit", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "payout", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "expires", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "priceInUSD", "type": "uint256" }], "name": "BondCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "BondDeposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "priceInUSD", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "internalPrice", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "debtRatio", "type": "uint256" }], "name": "BondPriceChanged", "type": "event" }, { "inputs": [{ "internalType": "bool", "name": "_isLiquidityBond", "type": "bool" }], "name": "bondPriceInUSD", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "payout", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "remaining", "type": "uint256" }], "name": "BondRedeemed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum BondDepositoryRai.Parameter", "name": "_parameter", "type": "uint8" }, { "indexed": false, "internalType": "uint256", "name": "_newValue", "type": "uint256" }], "name": "BondTermsUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum BondDepositoryRai.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressSet", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }, { "internalType": "bool", "name": "_isLiquidityBond", "type": "bool" }], "name": "deposit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "poolFee", "type": "uint24" }], "name": "getPriceToken", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }], "name": "recoverLostToken", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bool", "name": "_isEnabled", "type": "bool" }, { "internalType": "bool", "name": "_isLiquidityBond", "type": "bool" }], "name": "setBondPurchaseEnabled", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum BondDepositoryRai.Parameter", "name": "_parameter", "type": "uint8" }, { "internalType": "uint256", "name": "_input", "type": "uint256" }], "name": "setBondTerms", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }, { "internalType": "enum BondDepositoryRai.Contracts", "name": "_contract", "type": "uint8" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_discountLp", "type": "uint256" }], "name": "setDiscountLp", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_discountU", "type": "uint256" }], "name": "setDiscountPrint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "setNeedStakeAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bondCalculatorAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "bondInfoData", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "payout", "type": "uint256" }, { "internalType": "uint256", "name": "vesting", "type": "uint256" }, { "internalType": "uint256", "name": "lastBlock", "type": "uint256" }, { "internalType": "uint256", "name": "pricePaid", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bondPurchaseEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "community", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contributionValueRewardsContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DAO", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "discountLp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "discountPrinciple", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "getBondInfoData", "outputs": [{ "components": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "payout", "type": "uint256" }, { "internalType": "uint256", "name": "vesting", "type": "uint256" }, { "internalType": "uint256", "name": "lastBlock", "type": "uint256" }, { "internalType": "uint256", "name": "pricePaid", "type": "uint256" }], "internalType": "struct BondDepositoryRai.Bond[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_depositor", "type": "address" }], "name": "getMembers", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "getStakedAmount", "outputs": [{ "internalType": "uint256", "name": "_stakedAmount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "inviteBond", "outputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "payout", "type": "uint256" }, { "internalType": "uint256", "name": "vesting", "type": "uint256" }, { "internalType": "uint256", "name": "lastBlock", "type": "uint256" }, { "internalType": "uint256", "name": "pricePaid", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "inviteRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lpbondPurchaseEnabled", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "needStakeAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "principle", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "quoterV2", "outputs": [{ "internalType": "contract IQuoterV2", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "RAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardDistributor", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "sRAI", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "staking", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "terms", "outputs": [{ "internalType": "uint256", "name": "controlVariable", "type": "uint256" }, { "internalType": "uint256", "name": "vestingTerm", "type": "uint256" }, { "internalType": "uint256", "name": "minimumPrice", "type": "uint256" }, { "internalType": "uint256", "name": "maxPayout", "type": "uint256" }, { "internalType": "uint256", "name": "fee", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "treasury", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "VESTING_DURATION", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "yieldVestingContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var yieldVestingAddress = '0xAf9a02D890e143f7a52eA0Ed6D4160B799b971A7';
var yieldVestingABI = [{ "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "string", "name": "rewardType", "type": "string" }], "name": "addVestingEntry", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "totalRewards", "type": "uint256" }, { "internalType": "uint256", "name": "startTimes", "type": "uint256" }, { "internalType": "uint256", "name": "durations", "type": "uint256" }, { "internalType": "uint256", "name": "releasedAmounts", "type": "uint256" }, { "internalType": "string", "name": "rewardTypes", "type": "string" }], "name": "migrateVestingEntries", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_rai", "type": "address" }, { "internalType": "address", "name": "_contributionRewardsContract", "type": "address" }, { "internalType": "address", "name": "_bondContractAddress", "type": "address" }, { "internalType": "address", "name": "_stakingContractAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "enum YieldVesting.Contracts", "name": "contractType", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" }], "name": "ContractAddressSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "string", "name": "rewardTypeFilter", "type": "string" }], "name": "releaseVesting", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "enum YieldVesting.Contracts", "name": "contractType", "type": "uint8" }, { "internalType": "address", "name": "contractAddress", "type": "address" }], "name": "setContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "rewardType", "type": "string" }], "name": "VestingAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "vestingId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "rewardType", "type": "string" }], "name": "VestingReleased", "type": "event" }, { "inputs": [], "name": "bondContractAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contributionRewardsContract", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "string", "name": "rewardTypeFilter", "type": "string" }], "name": "getUserVestingEntries", "outputs": [{ "components": [{ "internalType": "uint256", "name": "totalReward", "type": "uint256" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "releasedAmount", "type": "uint256" }, { "internalType": "string", "name": "rewardType", "type": "string" }], "internalType": "struct YieldVesting.VestingEntry[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nextVestingId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "raiToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingContractAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vestingEntries", "outputs": [{ "internalType": "uint256", "name": "totalReward", "type": "uint256" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "duration", "type": "uint256" }, { "internalType": "uint256", "name": "releasedAmount", "type": "uint256" }, { "internalType": "string", "name": "rewardType", "type": "string" }], "stateMutability": "view", "type": "function" }];

var poolAddressV3 = '0xc4b692c2c2a40b4ce46fe0e35b2978500d35192d';
var pancakeV3PoolABI = [{ "inputs": [], "name": "slot0", "outputs": [{ "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }, { "internalType": "int24", "name": "tick", "type": "int24" }, { "internalType": "uint16", "name": "observationIndex", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" }, { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" }], "stateMutability": "view", "type": "function" }];

var raiSwapV3 = '0xFeA738feAc5B53A786718131e3f7Acc416bC1ee7';
var raiSwapV3ABI = [{ "inputs": [{ "internalType": "address", "name": "_raiTokenAddress", "type": "address" }, { "internalType": "address", "name": "_swapRouterAddress", "type": "address" }, { "internalType": "address", "name": "_usdtAddress", "type": "address" }, { "internalType": "address", "name": "_daoAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenIn", "type": "address" }, { "internalType": "address", "name": "_tokenOut", "type": "address" }, { "internalType": "uint256", "name": "_amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "_type", "type": "uint256" }], "name": "swapRaiAndDistribute", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "calculateAmountAfterBuyFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "calculateAmountAfterSellFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getBuyFeeRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrecision", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getSellFeeRatio", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "INTERN_SYSTEM", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_account", "type": "address" }], "name": "isWhitelisted", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "raiAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "raiToken", "outputs": [{ "internalType": "contract IRaiToken", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapRouter", "outputs": [{ "internalType": "contract IPancakeSwapV3Router", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "swapRouterAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "usdtAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];

var pancakeswapV3QuoterAddress = '0x961a7c7ac97942848a7be1f21326b819eb9b771a';
var pancakeswapV3QuoterABI = [{ "inputs": [{ "internalType": "address", "name": "_deployer", "type": "address" }, { "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH9", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH9", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deployer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int256", "name": "amount0Delta", "type": "int256" }, { "internalType": "int256", "name": "amount1Delta", "type": "int256" }, { "internalType": "bytes", "name": "path", "type": "bytes" }], "name": "pancakeV3SwapCallback", "outputs": [], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "name": "quoteExactInput", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint160[]", "name": "sqrtPriceX96AfterList", "type": "uint160[]" }, { "internalType": "uint32[]", "name": "initializedTicksCrossedList", "type": "uint32[]" }, { "internalType": "uint256", "name": "gasEstimate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct IQuoterV2.QuoteExactInputSingleParams", "name": "params", "type": "tuple" }], "name": "quoteExactInputSingle", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceX96After", "type": "uint160" }, { "internalType": "uint32", "name": "initializedTicksCrossed", "type": "uint32" }, { "internalType": "uint256", "name": "gasEstimate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "name": "quoteExactOutput", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint160[]", "name": "sqrtPriceX96AfterList", "type": "uint160[]" }, { "internalType": "uint32[]", "name": "initializedTicksCrossedList", "type": "uint32[]" }, { "internalType": "uint256", "name": "gasEstimate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct IQuoterV2.QuoteExactOutputSingleParams", "name": "params", "type": "tuple" }], "name": "quoteExactOutputSingle", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceX96After", "type": "uint160" }, { "internalType": "uint32", "name": "initializedTicksCrossed", "type": "uint32" }, { "internalType": "uint256", "name": "gasEstimate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }];

var pancakeswapV3RouterAddress = '0x03aad35e7850d1721755cb83394184f77e9f08ea';
var pancakeswapV3RouterABI = [{ "inputs": [{ "internalType": "address", "name": "_deployer", "type": "address" }, { "internalType": "address", "name": "_factory", "type": "address" }, { "internalType": "address", "name": "_WETH9", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "WETH9", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "deployer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" }], "internalType": "struct ISwapRouter.ExactInputParams", "name": "params", "type": "tuple" }], "name": "exactInput", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountIn", "type": "uint256" }, { "internalType": "uint256", "name": "amountOutMinimum", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct ISwapRouter.ExactInputSingleParams", "name": "params", "type": "tuple" }], "name": "exactInputSingle", "outputs": [{ "internalType": "uint256", "name": "amountOut", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "bytes", "name": "path", "type": "bytes" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMaximum", "type": "uint256" }], "internalType": "struct ISwapRouter.ExactOutputParams", "name": "params", "type": "tuple" }], "name": "exactOutput", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "tokenIn", "type": "address" }, { "internalType": "address", "name": "tokenOut", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint256", "name": "amountOut", "type": "uint256" }, { "internalType": "uint256", "name": "amountInMaximum", "type": "uint256" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct ISwapRouter.ExactOutputSingleParams", "name": "params", "type": "tuple" }], "name": "exactOutputSingle", "outputs": [{ "internalType": "uint256", "name": "amountIn", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "int256", "name": "amount0Delta", "type": "int256" }, { "internalType": "int256", "name": "amount1Delta", "type": "int256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "pancakeV3SwapCallback", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "refundETH", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitAllowed", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitAllowedIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "selfPermitIfNecessary", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "sweepToken", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "feeBips", "type": "uint256" }, { "internalType": "address", "name": "feeRecipient", "type": "address" }], "name": "sweepTokenWithFee", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "unwrapWETH9", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amountMinimum", "type": "uint256" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "feeBips", "type": "uint256" }, { "internalType": "address", "name": "feeRecipient", "type": "address" }], "name": "unwrapWETH9WithFee", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];
var nonfungiblePositionManagerAddress = '0xd303a176836a7179d018344396ea05cb94b05769';
var nonfungiblePositionManagerABI = [{ "type": "constructor", "stateMutability": "nonpayable", "inputs": [{ "type": "address", "name": "_deployer", "internalType": "address" }, { "type": "address", "name": "_factory", "internalType": "address" }, { "type": "address", "name": "_WETH9", "internalType": "address" }, { "type": "address", "name": "_tokenDescriptor_", "internalType": "address" }] }, { "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "approved", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "tokenId", "internalType": "uint256", "indexed": true }], "anonymous": false }, { "type": "event", "name": "ApprovalForAll", "inputs": [{ "type": "address", "name": "owner", "internalType": "address", "indexed": true }, { "type": "address", "name": "operator", "internalType": "address", "indexed": true }, { "type": "bool", "name": "approved", "internalType": "bool", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Collect", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256", "indexed": true }, { "type": "address", "name": "recipient", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "DecreaseLiquidity", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256", "indexed": true }, { "type": "uint128", "name": "liquidity", "internalType": "uint128", "indexed": false }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "IncreaseLiquidity", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256", "indexed": true }, { "type": "uint128", "name": "liquidity", "internalType": "uint128", "indexed": false }, { "type": "uint256", "name": "amount0", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount1", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "from", "internalType": "address", "indexed": true }, { "type": "address", "name": "to", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "tokenId", "internalType": "uint256", "indexed": true }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "DOMAIN_SEPARATOR", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bytes32", "name": "", "internalType": "bytes32" }], "name": "PERMIT_TYPEHASH", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "WETH9", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "approve", "inputs": [{ "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }] }, { "type": "function", "stateMutability": "pure", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "baseURI", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "burn", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "collect", "inputs": [{ "type": "tuple", "name": "params", "internalType": "struct INonfungiblePositionManager.CollectParams", "components": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint128", "name": "amount0Max", "internalType": "uint128" }, { "type": "uint128", "name": "amount1Max", "internalType": "uint128" }] }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "address", "name": "pool", "internalType": "address" }], "name": "createAndInitializePoolIfNecessary", "inputs": [{ "type": "address", "name": "token0", "internalType": "address" }, { "type": "address", "name": "token1", "internalType": "address" }, { "type": "uint24", "name": "fee", "internalType": "uint24" }, { "type": "uint160", "name": "sqrtPriceX96", "internalType": "uint160" }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "decreaseLiquidity", "inputs": [{ "type": "tuple", "name": "params", "internalType": "struct INonfungiblePositionManager.DecreaseLiquidityParams", "components": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "uint128", "name": "liquidity", "internalType": "uint128" }, { "type": "uint256", "name": "amount0Min", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Min", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }] }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "deployer", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "factory", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "getApproved", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "uint128", "name": "liquidity", "internalType": "uint128" }, { "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "increaseLiquidity", "inputs": [{ "type": "tuple", "name": "params", "internalType": "struct INonfungiblePositionManager.IncreaseLiquidityParams", "components": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "uint256", "name": "amount0Desired", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Desired", "internalType": "uint256" }, { "type": "uint256", "name": "amount0Min", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Min", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }] }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "isApprovedForAll", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "address", "name": "operator", "internalType": "address" }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "uint128", "name": "liquidity", "internalType": "uint128" }, { "type": "uint256", "name": "amount0", "internalType": "uint256" }, { "type": "uint256", "name": "amount1", "internalType": "uint256" }], "name": "mint", "inputs": [{ "type": "tuple", "name": "params", "internalType": "struct INonfungiblePositionManager.MintParams", "components": [{ "type": "address", "name": "token0", "internalType": "address" }, { "type": "address", "name": "token1", "internalType": "address" }, { "type": "uint24", "name": "fee", "internalType": "uint24" }, { "type": "int24", "name": "tickLower", "internalType": "int24" }, { "type": "int24", "name": "tickUpper", "internalType": "int24" }, { "type": "uint256", "name": "amount0Desired", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Desired", "internalType": "uint256" }, { "type": "uint256", "name": "amount0Min", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Min", "internalType": "uint256" }, { "type": "address", "name": "recipient", "internalType": "address" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }] }] }, { "type": "function", "stateMutability": "payable", "outputs": [{ "type": "bytes[]", "name": "results", "internalType": "bytes[]" }], "name": "multicall", "inputs": [{ "type": "bytes[]", "name": "data", "internalType": "bytes[]" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "ownerOf", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "pancakeV3MintCallback", "inputs": [{ "type": "uint256", "name": "amount0Owed", "internalType": "uint256" }, { "type": "uint256", "name": "amount1Owed", "internalType": "uint256" }, { "type": "bytes", "name": "data", "internalType": "bytes" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "permit", "inputs": [{ "type": "address", "name": "spender", "internalType": "address" }, { "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint96", "name": "nonce", "internalType": "uint96" }, { "type": "address", "name": "operator", "internalType": "address" }, { "type": "address", "name": "token0", "internalType": "address" }, { "type": "address", "name": "token1", "internalType": "address" }, { "type": "uint24", "name": "fee", "internalType": "uint24" }, { "type": "int24", "name": "tickLower", "internalType": "int24" }, { "type": "int24", "name": "tickUpper", "internalType": "int24" }, { "type": "uint128", "name": "liquidity", "internalType": "uint128" }, { "type": "uint256", "name": "feeGrowthInside0LastX128", "internalType": "uint256" }, { "type": "uint256", "name": "feeGrowthInside1LastX128", "internalType": "uint256" }, { "type": "uint128", "name": "tokensOwed0", "internalType": "uint128" }, { "type": "uint128", "name": "tokensOwed1", "internalType": "uint128" }], "name": "positions", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "refundETH", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "safeTransferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "safeTransferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "tokenId", "internalType": "uint256" }, { "type": "bytes", "name": "_data", "internalType": "bytes" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "selfPermit", "inputs": [{ "type": "address", "name": "token", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "selfPermitAllowed", "inputs": [{ "type": "address", "name": "token", "internalType": "address" }, { "type": "uint256", "name": "nonce", "internalType": "uint256" }, { "type": "uint256", "name": "expiry", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "selfPermitAllowedIfNecessary", "inputs": [{ "type": "address", "name": "token", "internalType": "address" }, { "type": "uint256", "name": "nonce", "internalType": "uint256" }, { "type": "uint256", "name": "expiry", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "selfPermitIfNecessary", "inputs": [{ "type": "address", "name": "token", "internalType": "address" }, { "type": "uint256", "name": "value", "internalType": "uint256" }, { "type": "uint256", "name": "deadline", "internalType": "uint256" }, { "type": "uint8", "name": "v", "internalType": "uint8" }, { "type": "bytes32", "name": "r", "internalType": "bytes32" }, { "type": "bytes32", "name": "s", "internalType": "bytes32" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "setApprovalForAll", "inputs": [{ "type": "address", "name": "operator", "internalType": "address" }, { "type": "bool", "name": "approved", "internalType": "bool" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "supportsInterface", "inputs": [{ "type": "bytes4", "name": "interfaceId", "internalType": "bytes4" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "sweepToken", "inputs": [{ "type": "address", "name": "token", "internalType": "address" }, { "type": "uint256", "name": "amountMinimum", "internalType": "uint256" }, { "type": "address", "name": "recipient", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "tokenByIndex", "inputs": [{ "type": "uint256", "name": "index", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "tokenOfOwnerByIndex", "inputs": [{ "type": "address", "name": "owner", "internalType": "address" }, { "type": "uint256", "name": "index", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "tokenURI", "inputs": [{ "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "transferFrom", "inputs": [{ "type": "address", "name": "from", "internalType": "address" }, { "type": "address", "name": "to", "internalType": "address" }, { "type": "uint256", "name": "tokenId", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "unwrapWETH9", "inputs": [{ "type": "uint256", "name": "amountMinimum", "internalType": "uint256" }, { "type": "address", "name": "recipient", "internalType": "address" }] }, { "type": "receive", "stateMutability": "payable" }];
raiwapp.config(function ($translateProvider, tmhDynamicLocaleProvider) { tmhDynamicLocaleProvider.localeLocationPattern('/Scripts/i18n/angular-locale_{{locale}}.js'); $translateProvider.useStaticFilesLoader({ prefix: '/AppJs/locale-', suffix: '.json' }); $translateProvider.preferredLanguage('en'); });
raiwapp.controller('raiwappController', function ($scope, $cookieStore, $translate, tmhDynamicLocale, $http) {
    $scope.web3 = null;
    $scope.accounts = null;
    var webconnectCalledOnLoad = false;
    async function initWeb3() {
        if (window.ethereum && window.Web3) {
            $scope.web3 = new window.Web3(window.ethereum);
            try {
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
            } catch (error) {
            };
        };
    };
    async function initLoginWeb3() {
        if (window.ethereum && window.Web3) {
            $scope.web3 = new window.Web3(window.ethereum);
            try {
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
                if (!webconnectCalledOnLoad) {
                    $scope.accounts = await $scope.web3.eth.requestAccounts();
                    $scope.selectedAccount = $scope.accounts[0];
                    webconnectCalledOnLoad = true;
                    $scope.webconnect();
                };

            } catch (error) {
            };
        };
    };
    function handleAccountsChanged(newAccounts) {
        $scope.accounts = newAccounts;
        if ($scope.accounts.length === 0) {
            $scope.selectedAccount = null;
            $cookieStore.remove('raiwappUser');
            $scope.CurrentUser = null;
            webconnectCalledOnLoad = false;
            $scope.$apply();
        } else {
            $scope.selectedAccount = $scope.accounts[0];
            webconnectCalledOnLoad = true;
            $scope.webconnect();
        };
    };
    function handleChainChanged(chainId) {
        const decimalChainId = parseInt(chainId, 16);
        if (decimalChainId !== desiredChainId) {
            connectAndCheckNetwork();
        };
    };
    $scope.Disconnect = function () {
        $scope.accounts = [];
        $scope.selectedAccount = null;
        $cookieStore.remove('raiwappUser');
        $scope.CurrentUser = null;
        webconnectCalledOnLoad = false;
    };
    $scope.webconnect = function () {
        if ($scope.selectedAccount != null && $scope.selectedAccount != '') {
            var currentUser = {
                address: $scope.selectedAccount
            };
            $cookieStore.put('raiwappUser', currentUser);
            $scope.CurrentUser = currentUser;
            if ($scope.CurrenPage == 'dashboard') {
                CreateChartMinting(0, 0);
                CreateChartTreasury(0, 0);
            };
            if ($scope.CurrenPage == 'stake') {
                GetTokenValue(raiContractAddress, 5);
                GetTokenValue(principleAddress, 6);
                if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
                    checkApproveStaking();
                    checksRaiAppove();
                }
            };
            if ($scope.CurrenPage == 'invite') {
                var ref = UrlParam.get.ref;
                if (ref != null && ref != '') {
                    localStorage.setItem('raifiRef', ref);
                }
                else {
                    ref = localStorage.getItem('raifiRef');
                };
                if (ref != null && ref != '') {
                    $('#txtReferrer').val($scope.TrimAccount(ref));
                    $scope.MyReferrer = ref;
                };
                if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
                    var linkRef = window.location.origin + '/invite.html?ref=' + $scope.CurrentUser.address;
                    $('#txtReferral').val(linkRef);
                    $('#txtReferralCode').val($scope.TrimAccount($scope.CurrentUser.address));
                    $scope.LinkRef = linkRef;

                };
            };
            if ($scope.CurrenPage == 'contribution') {
                GetTokenValue(principleAddress, 6);
                getUserVestingEntries('Contribution');
                getMyContributors();
                checkApproveClaimContributionReward();
                getRewardHistory();
            };
            if ($scope.CurrenPage == 'bond') {
                getUserVestingEntries("Bond");
                checkBondPurchaseEnabled();
                checkLpBondPurchaseEnabled();
                checkApproveBond();
            };
            if ($scope.CurrenPage == 'swap') {
                $scope.IsApprove = 0;
                if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
                    $scope.IsApprove = 1;
                };
                GetUserTokenSwap();
            };
            getTotalSupplyRAI();
            getRAIPriceOnPancakeSwapV3();
            getTotalStaked();
            getRebase();
            getIndexRai();
            getStakingPulicInfo();
            getStakingMyInfo();
            getReferralInfo();
            $scope.$apply();
        }
        else {
            initLoginWeb3();
        };
    };
    var web3ReadOnly = null;
    var stakingContract = null;
    var stakingLongContract = null;
    var sraiContract = null;
    var communityContract = null;
    var bondContract = null;
    var raiContract = null;
    var usdtContract = null;
    var yieldVestingContract = null;
    var contributionContract = null;
    var treasuryContract = null;
    $scope.MarketCap = 0;
    $scope.MarketCapUsd = 0;
    $scope.PriceU2uUsd = 0;
    $scope.TotalSupplyRAI = 0;
    $scope.RaiPrice = 0;
    $scope.TotalStakedRAI = 0;
    $scope.TotalStakedUSD = 0;
    $scope.TotalTreasuryValue = 0;
    $scope.IndexRAI = 0;
    $scope.APYRAI = 0;
    $scope.PrincipalAmount = 0;
    $scope.DirectInvitation = 0;
    $scope.NumberOfTeam = 0;
    $scope.InvitationList = [];
    $scope.TotalContribution = 0;
    $scope.TotalSale = 0;
    $scope.UsdtBalanceTreasury = 0;
    $scope.TotalLPValue = 0;
    $scope.MyBondList = [];
    $scope.DirectBondAwardList = [];
    $scope.TotalLPValueInUSDT = 0;
    $scope.MyReferrer = '';
    $scope.TotalUnstakedRAI = 0;
    $scope.NextRewardYield = 0;
    $scope.Roi5 = '0%';
    $scope.YourWarmupBalance = 0;
    $scope.YourWarmupBalanceLong = 0;
    $scope.Interest = 0;
    $scope.StakedBalance = 0;
    $scope.NextRewardAmount = 0;
    $scope.YourWarmupAvailable = 0;
    $scope.YourWarmupAvailableLong = 0;
    $scope.IsEnabledBond = false;
    $scope.IsEnabledBondLP = false;
    $scope.WU2UBalance = 0;
    $scope.LinkRef = null;
    $scope.isMember = 0;
    $scope.ClainAmountInterest = 0;
    $scope.ClainTypeInterest = 30;
    $scope.BalanceRai = 0;
    $scope.TotaRemaining = 0;
    $scope.BalanceXcoin = 0;
    $scope.SellFeeRatio = 0;
    $scope.BuyFeeRatio = 0;
    $scope.Precision = 0;
    function initApp() {
        $scope.PriceU2uUsd = sessionStorage.getItem('u2uPrice');;
        web3ReadOnly = new Web3(new Web3.providers.HttpProvider(readOnlyProviderUrl));
        stakingContract = new web3ReadOnly.eth.Contract(stakingContractABI, stakingAddress);
        stakingLongContract = new web3ReadOnly.eth.Contract(stakingLongABI, stakingLongAddress);
        sraiContract = new web3ReadOnly.eth.Contract(sRaiContractABI, sRaiContractAddress);
        communityContract = new web3ReadOnly.eth.Contract(communityContractABI, communityContractAddress);
        bondContract = new web3ReadOnly.eth.Contract(bondContractABI, bondContractAddress);
        raiContract = new web3ReadOnly.eth.Contract(raiContractABI, raiContractAddress);
        usdtContract = new web3ReadOnly.eth.Contract(principleContractABI, principleAddress);
        yieldVestingContract = new web3ReadOnly.eth.Contract(yieldVestingABI, yieldVestingAddress);
        contributionContract = new web3ReadOnly.eth.Contract(contributionContractABI, contributionContractAddress);
        treasuryContract = new web3ReadOnly.eth.Contract(treasuryContractABI, treasuryContractAddress);
        $scope.CurrentUser = $cookieStore.get('raiwappUser');
        $scope.CurrenPage = location.pathname.split("/").pop().toLowerCase();
        $scope.CurrenPage = $scope.CurrenPage.replace(".html", "");

        CheckNetwork();
        LengReady();
        UnBlockUI();
    };
    async function CheckNetwork() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            if ($scope.web3 != null) {
                var networkId = await $scope.web3.eth.net.getId();
                if (networkId == 39 || networkId == '39' || networkId == '0x27' || networkId == 2484 || networkId == '2484') {
                    return;
                };
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '2484' }],
                    });
                } catch (switchError) {
                }
            }
        }
    };
    initApp();

    $scope.FromWei = function (amount) {
        if (amount == null) {
            return;
        }
        var nunberS = web3ReadOnly.utils.fromWei(amount, 'ether');
        if (nunberS != '') {
            nunberS = parseFloat(nunberS);
        }
        return nunberS;
    };
    if ($scope.CurrenPage == 'dashboard') {
        CreateChartMinting(0, 0);
        CreateChartTreasury(0, 0);
        CreateChartRFV();
        CreateChartSRai();
    };
    function CreateChartRFV() {
        $http.get(servicelink + 'api/Pulic/RfvData')
            .then(function (response) {
                var dataChart = response.data;
                $scope.LastRFV = dataChart[dataChart.length-1];
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(function () {
                    drawChart(dataChart,'rfvDailyChart');
                });
            })
            .catch(function (errorResponse) {
            });
    };
    async function getTotalSrai () {
        var sraitotal = await sraiContract.methods.totalSupply().call();
        $scope.TotalSupplySRai = web3ReadOnly.utils.fromWei(sraitotal, 'ether');
        $scope.$apply();
    };
    function CreateChartSRai() {
        getTotalSrai();
        $http.get(servicelink + 'api/Pulic/sRaiData')
            .then(function (response) {
                var dataChart = response.data;
                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(function () {
                    drawChart(dataChart, 'sRaiDailyChart');
                });
            })
            .catch(function (errorResponse) {
            });
    }
    function drawChart(dataChart, idChart) {
        if (!dataChart || dataChart.length === 0) {
            return;
        }
        var timeText = $translate.instant('Time');
        var amountText = $translate.instant('Amount');
        let dataForGoogleChart = [[timeText, amountText]];
        dataChart.forEach(item => {
            const dateObj = new Date(item.Created); 
            dataForGoogleChart.push([dateObj, item.Amount]); 
        });
        var data = google.visualization.arrayToDataTable(dataForGoogleChart);
        var options = {
            hAxis: {
                titleTextStyle: { color: '#333' },
                format: 'dd MMM', 
                gridlines: { count: -1 }
            },
            vAxis: {
                minValue: 0,
                format: 'short'
            },
            legend: 'none',
            chartArea: { left: '5%', top: '5%', width: '90%', height: '80%' } ,
            tooltip: {
                isHtml: true, 
                trigger: 'hover'
            },
            isStacked: false, 
            pointSize: 5,  
            lineWidth: 2,
            colors: ['#32CD32']
        };
        var chart = new google.visualization.AreaChart(document.getElementById(idChart));
        chart.draw(data, options);
    }

    $scope.TrimAccount = function (str) {
        if (str == null || str == '') {
            return '';
        }
        if (str.length <= 8) {
            return str;
        }
        var start = str.substring(0, 7);
        var end = str.substring(str.length - 5, str.length);
        return start + "..." + end;
    };
    function BlockUI() {
        $('#page-preloader').show();
    };
    function UnBlockUI() {
        $('#page-preloader').hide();
    };
    function ValidateMsg(id, text) {
        id = '#' + id;
        var input = $(id);
        var thisAlert = $(input).parent();
        if (text != null && text != '') {
            thisAlert.attr('data-validate', text);
        }
        $(thisAlert).addClass('alert-validate');
    };
    $scope.CloseMenu = function () {
        $('#linkMenu').removeClass('show');
    };
    function LengReady() {
        var key = localStorage.getItem("raiwappLeng");
        var icon = localStorage.getItem("raiwappLengIcon");
        if (key == null || key == "undefined") {
            key = "en";
            icon = 'english';
            localStorage.setItem("raiwappLeng", key);
            localStorage.setItem("raiwappLengIcon", icon);
        };
        $scope.LengIcon = icon;
        $scope.CurrenLeng = key;
        tmhDynamicLocale.set(key);
        $translate.use(key);
    };
    $scope.ChangeLanguage = function (leng, icon) {
        localStorage.setItem("raiwappLeng", leng);
        localStorage.setItem("raiwappLengIcon", icon);
        $scope.LengIcon = icon;
        LengReady();
    };
    function Notific(title, text, type) {
        UnBlockUI();
        Swal.fire({
            title: title,
            text: text,
            icon: type,
            showConfirmButton: false,
            timer: 2000,
        });
    };
    function NotificConfirm(title, text, type) {
        UnBlockUI();
        Swal.fire({
            title: title,
            text: text,
            icon: type,
            showConfirmButton: true,
            confirmButtonText: 'OK',
            timer: undefined,
        });
    };
    function CopyValue(value) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value)
                .then(() => {
                    Notific('', $translate.instant('CopiedToClipboard'), 'success');
                })
                .catch(err => {
                    fallbackCopyToClipboard(value);
                });
        } else {
            fallbackCopyToClipboard(value);
        }
    }
    function fallbackCopyToClipboard(value) {
        const elem = document.createElement('input');
        elem.value = value;
        elem.id = 'copyid_fallback';
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.left = '0';
        elem.style.opacity = '0';
        document.body.appendChild(elem);
        try {
            if (navigator.userAgent.match(/ipad|iphone/i)) {
                elem.focus();
                elem.setSelectionRange(0, 999999);
            } else {
                elem.select();
            }
            const successful = document.execCommand("Copy");
            if (successful) {
                Notific('', $translate.instant('CopiedToClipboard'), 'success');
            }
        } catch (errExec) {

        } finally {
            document.body.removeChild(elem);
        }
    }
    async function getTotalStaked() {
        stakingContract.methods.contractBalance().call()
            .then(balance => {
                var totalStakedRAI = web3ReadOnly.utils.fromWei(balance, 'ether');
                $scope.TotalStakedRAI = totalStakedRAI;
                $scope.TotalStakedUSD = $scope.TotalStakedRAI * $scope.RaiPrice;
                CreateChartMinting($scope.TotalStakedRAI, $scope.TotalSupplyRAI - $scope.TotalStakedRAI);
                $scope.$apply();
            })
            .catch(error => {
            });
    };

    $scope.UnStakeLong = function (stakeId) {
        unStakeLongRai(stakeId);
    };
    async function unStakeLongRai(stakeId) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var unstakeTx = await stakingLongContract.methods.unstake(stakeId);
                var gasEstimate = await unstakeTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingLongAddress,
                    data: unstakeTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    if (isPrincipal) {
                        NotificConfirm('', $translate.instant('UnstakeSuccessfully'), 'success');
                        $('#txtAmountUnStake').val('');
                        $('#UnStakeForm').modal('hide');
                    }
                    getStakingMyInfo();
                };
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'unStakeRAI');
            }
        }
    };
    async function getIndexRai() {
        console.log('getIndexRai');
        stakingContract.methods.index().call()
            .then(index => {
                var indexRAI = web3ReadOnly.utils.fromWei(index, 'ether');
                $scope.IndexRAI = parseFloat(indexRAI);
                $scope.$apply();
            })
            .catch(error => {
            });
    };
    async function getRebase() {
        try {
            var epochInfo = await stakingContract.methods.epoch().call();
            var endBlock = BigInt(epochInfo.endBlock);
            var currentBlock = await web3ReadOnly.eth.getBlockNumber();
            var blocksRemaining = endBlock - currentBlock;
            if (blocksRemaining <= 0n) {
                return;
            }
            var averageBlockTimeSeconds = 1.5;
            var timeToRebaseSeconds = Number(blocksRemaining) * averageBlockTimeSeconds;
            var totalMinutes = Math.floor(timeToRebaseSeconds / 60);
            var hours = Math.floor(totalMinutes / 60);
            var minutes = totalMinutes % 60;
            var timeString = "";
            if (hours > 0) {
                timeString += hours.toString() + ' ' + $translate.instant("Hour") + ' ';
            };
            timeString += minutes.toString() + ' ' + $translate.instant("Minute");
            $scope.NextRebase = timeString;
            $scope.$apply();
        }
        catch (error) {
            ErrorManger(error, 'getRebase');
        };
    };
    function ErrorManger(error, funtionName) {
        UnBlockUI();
        if (error.code == 4001) {
            NotificConfirm('', $translate.instant('UserDenied'), 'warning');
        }
        else {
        }
        console.log(funtionName);
        console.log(error.toString());
    };
    async function getStakingPulicInfo() {
        if (web3ReadOnly) {
            try {
                var epochInfo = await stakingContract.methods.epoch().call();
                var epochLength = parseInt(epochInfo.length);
                var distributeAmount = parseInt(epochInfo.distribute);
                var circulatingsRaiSupply = await stakingContract.methods.circulatingsRaiSupply().call();
                var circulatingSupplyOfsRAI = parseInt(circulatingsRaiSupply);
                if (circulatingSupplyOfsRAI === 0) {
                    return;
                }
                var rewardRatePerEpoch = distributeAmount / circulatingSupplyOfsRAI;
                if (rewardRatePerEpoch > 0.002) {
                    rewardRatePerEpoch = 0.002;
                };
                if (rewardRatePerEpoch < 0.0015) {
                    rewardRatePerEpoch = 0.0015;
                };
                $scope.NextRewardYield = (rewardRatePerEpoch * 100).toFixed(4).toString() + '%';

                var secondsPerYear = 31536000;
                var averageBlockTimeSeconds = 1.5;
                var secondsPerEpoch = epochLength * averageBlockTimeSeconds;
                var epochsPerYear = secondsPerYear / secondsPerEpoch;
                var apy = ((1 + rewardRatePerEpoch) ** epochsPerYear - 1) * 100;
                $scope.APYRAI = `${apy.toFixed(3)}%`;

                var secondsPer5day = 432000;
                var epochsPer5day = secondsPer5day / secondsPerEpoch;
                var a5day = ((1 + rewardRatePerEpoch) ** epochsPer5day - 1) * 100;
                $scope.Roi5 = a5day.toFixed(4).toString() + '%';

                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getStakingPulicInfo');
            };

        };
    };
    async function getStakingMyInfo() {
        $scope.MyStakingLongs = [];
        if (web3ReadOnly) {
            try {
                if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
                    var userAddress = $scope.CurrentUser.address;
                    var principalWei = await stakingContract.methods.principal(userAddress).call();
                    var principal = web3ReadOnly.utils.fromWei(principalWei, 'ether');
                    var principal1Wei = await stakingLongContract.methods.principal($scope.CurrentUser.address).call();
                    var principal1 = web3ReadOnly.utils.fromWei(principal1Wei, 'ether');

                    $scope.PrincipalAmount = parseFloat(principal);
                    $scope.TotalPrincipalAmount = $scope.PrincipalAmount + parseFloat(principal1);
                    $scope.StakeBase = $scope.TotalPrincipalAmount * 4;
                    $scope.$apply();

                    var warmupData = await stakingContract.methods.warmupInfo(userAddress).call();
                    var yourWarmupBalance = warmupData.gons;
                    var warmupBalance = web3ReadOnly.utils.fromWei(yourWarmupBalance.toString(), 'ether');
                    $scope.YourWarmupBalance = parseFloat(warmupBalance) * $scope.IndexRAI;
                    $scope.$apply();
                    var currentEpoch = await stakingContract.methods.epoch().call();
                    var currentEpochNumber = web3ReadOnly.utils.fromWei(currentEpoch.number.toString(), 'ether');
                    var expiryEpoch = web3ReadOnly.utils.fromWei(warmupData.expiry.toString(), 'ether');
                    if (currentEpochNumber >= expiryEpoch) {
                        $scope.YourWarmupAvailable = $scope.YourWarmupBalance;
                        $scope.$apply();
                    };
                    var warmupDataLong = await stakingLongContract.methods.warmupInfo(userAddress).call();
                    var yourWarmupBalanceLong = warmupDataLong.gons;
                    var warmupBalanceLong = web3ReadOnly.utils.fromWei(yourWarmupBalanceLong.toString(), 'ether');
                    $scope.YourWarmupBalanceLong = parseFloat(warmupBalanceLong) * $scope.IndexRAI;
                    $scope.$apply();

                    var expiryEpochLong = web3ReadOnly.utils.fromWei(warmupDataLong.expiry.toString(), 'ether');
                    if (currentEpochNumber >= expiryEpochLong) {
                        $scope.YourWarmupAvailableLong = $scope.YourWarmupBalanceLong;
                        $scope.$apply();
                    };

                    var sraiBalanceWei = await sraiContract.methods.balanceOf(userAddress).call();
                    var sraiBalance = web3ReadOnly.utils.fromWei(sraiBalanceWei.toString(), 'ether');
                    var interestRAI = parseFloat(sraiBalance) + $scope.YourWarmupBalance + $scope.YourWarmupBalanceLong - $scope.TotalPrincipalAmount;
                    if (interestRAI < 0) {
                        interestRAI = 0;
                    };
                    $scope.Interest = interestRAI;
                    $scope.StakedBalance = ($scope.PrincipalAmount + $scope.Interest) - $scope.YourWarmupBalance;
                    $scope.NextRewardAmount = ($scope.PrincipalAmount + $scope.Interest) * parseFloat($scope.NextRewardYield) * 0.01;

                    $scope.$apply();

                    var balance = await stakingLongContract.methods.xCoinBalanceOf($scope.CurrentUser.address).call();
                    var totalXcoin = web3ReadOnly.utils.fromWei(balance, 'ether');
                    $scope.BalanceXcoin = totalXcoin;
                    $scope.$apply();

                    const allStakes = [];
                    const stakeIds = await stakingLongContract.methods.getUserStakeIds($scope.CurrentUser.address).call();
                    if (stakeIds.length > 0) {
                        for (const stakeId of stakeIds) {
                            const stakeInfo = await stakingLongContract.methods.getStakeInfo($scope.CurrentUser.address, stakeId).call();
                            const startTime = Number(stakeInfo.startTime);
                            const startDate = new Date(startTime * 1000);
                            const duration = Number(stakeInfo.durationDays);
                            const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
                            const currentTime = new Date();
                            const timeLeftMs = endDate.getTime() - currentTime.getTime();
                            var time2Left = '';
                            if (timeLeftMs > 0) {
                                const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
                                const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
                                var time2Left = days + ' ' + $translate.instant("Days") + ' ' + hours + ' ' + $translate.instant("Hour") + ' ' + minutes + ' ' + $translate.instant("Minute");
                            }

                            const formattedStakeInfo = {
                                stakeId: Number(stakeInfo.stakeId),
                                user: stakeInfo.user,
                                amount: stakeInfo.amount.toString(),
                                startTime: Number(stakeInfo.startTime),
                                durationDays: Number(stakeInfo.durationDays),
                                isWithdrawn: stakeInfo.isWithdrawn,
                                time2Left: time2Left,
                                timeLeftMs: timeLeftMs
                            };
                            allStakes.push(formattedStakeInfo);
                        };
                        $scope.MyStakingLongs = allStakes;
                        $scope.$apply();
                    };
                    var hisUser = $scope.CurrentUser.address;
                    var stakeHistory = [];
                    const eventStaked = await stakingContract.getPastEvents('Staked', {
                        filter: { staker: hisUser  },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventStaked) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        stakeHistory[stakeHistory.length] = obj;
                    };
                    var stakingContractOld = new web3ReadOnly.eth.Contract(stakingContractABIOld, stakingAddressOld);
                    const eventStakedOld = await stakingContractOld.getPastEvents('Staked', {
                        filter: { staker: hisUser },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventStakedOld) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        stakeHistory[stakeHistory.length] = obj;
                    };
                    var stakingContractOld1 = new web3ReadOnly.eth.Contract(stakingContractABIOld1, stakingAddressOld1);
                    const eventStakedOld1 = await stakingContractOld1.getPastEvents('Staked', {
                        filter: { staker: hisUser },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventStakedOld1) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        stakeHistory[stakeHistory.length] = obj;
                    };
                    $scope.StakeHistories = removeDuplicatesByBothFields(stakeHistory);
                    $scope.StakeHistories.sort((a, b) => b.time.getTime() - a.time.getTime());
                    $scope.$apply();

                    var unstakeHistory = [];
                    const eventUnStaked = await stakingContract.getPastEvents('Unstaked', {
                        filter: { staker: hisUser },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventUnStaked) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        unstakeHistory[unstakeHistory.length] = obj;
                    };
                    const eventUnStakedOld = await stakingContractOld.getPastEvents('Unstaked', {
                        filter: { staker: hisUser, isPrincipal:true },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventUnStakedOld) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        unstakeHistory[unstakeHistory.length] = obj;
                    };
                    const eventUnStakedOld1 = await stakingContractOld.getPastEvents('Unstaked', {
                        filter: { staker: hisUser, isPrincipal: true },
                        fromBlock: 0,
                        toBlock: 'latest'
                    });
                    for (const event of eventUnStakedOld1) {
                        var obj = new Object();
                        obj.amount = parseFloat(web3ReadOnly.utils.fromWei(event.returnValues.amount, 'ether'));
                        obj.time = await getBlockTimestamp(event.blockNumber);
                        unstakeHistory[unstakeHistory.length] = obj;
                    }
                    $scope.UnStakeHistories = removeDuplicatesByBothFields(unstakeHistory);
                    $scope.UnStakeHistories.sort((a, b) => b.time.getTime() - a.time.getTime());
                    $scope.$apply();
                };
            } catch (error) {
                ErrorManger(error, 'getStakingMyInfo');
            };

        };
    };
    function removeDuplicatesByBothFields(arr) {
        const uniqueRecords = new Set();
        const result = [];
        arr.forEach(item => {
            const uniqueKey = JSON.stringify(item);
            if (!uniqueRecords.has(uniqueKey)) {
                uniqueRecords.add(uniqueKey);
                result.push(item);
            }
        });

        return result;
    }

    async function getBlockTimestamp(blockNumber) {
        try {
            const block = await web3ReadOnly.eth.getBlock(blockNumber);
            if (block) {
                const timestamp = block.timestamp; 
                const date = new Date(Number(timestamp) * 1000);
                return date;
            }
        } catch (error) {
        }
    }
    async function getTotalSupplyRAI() {
        if (web3ReadOnly) {
            try {
                var totalSupplyRaw = await raiContract.methods.totalSupply().call();
                var totalSupplyFormatted = web3ReadOnly.utils.fromWei(totalSupplyRaw, 'ether');
                $scope.TotalSupplyRAI = totalSupplyFormatted;
                $scope.MarketCap = $scope.TotalSupplyRAI * $scope.RaiPrice;
                $scope.MarketCapUsd = $scope.MarketCap * $scope.PriceU2uUsd;
                CreateChartMinting($scope.TotalStakedRAI, $scope.TotalSupplyRAI - $scope.TotalStakedRAI);
                $scope.$apply();

            } catch (error) {
                ErrorManger(error, 'getTotalSupplyRAI');
            }
        }
    }

    async function getRAIPriceOnPancakeSwapV3() {
        var amoutPrice = await getSwapQuoteV3(1, raiContractAddress, principleAddress, -1);
        $scope.RaiPrice = amoutPrice;
        $scope.MarketCap = $scope.TotalSupplyRAI * $scope.RaiPrice;
        $scope.MarketCapUsd = $scope.MarketCap * $scope.PriceU2uUsd;
        $scope.TotalStakedUSD = $scope.TotalStakedRAI * $scope.RaiPrice;
        $scope.$apply();
        return;
    }
    async function getU2uTreasury() {
        try {
            var abi = [{ "type": "event", "name": "Approval", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "guy", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Deposit", "inputs": [{ "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Transfer", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "address", "name": "dst", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawal", "inputs": [{ "type": "address", "name": "src", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "wad", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "allowance", "inputs": [{ "type": "address", "name": "", "internalType": "address" }, { "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "approve", "inputs": [{ "type": "address", "name": "guy", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "balanceOf", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint8", "name": "", "internalType": "uint8" }], "name": "decimals", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "deposit", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "name", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "string", "name": "", "internalType": "string" }], "name": "symbol", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalSupply", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transfer", "inputs": [{ "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "transferFrom", "inputs": [{ "type": "address", "name": "src", "internalType": "address" }, { "type": "address", "name": "dst", "internalType": "address" }, { "type": "uint256", "name": "wad", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "withdraw", "inputs": [{ "type": "uint256", "name": "wad", "internalType": "uint256" }] }];
            var usdtContract = new web3ReadOnly.eth.Contract(abi, principleAddress);
            var u2uInTreasury = await usdtContract.methods.balanceOf(treasuryContractAddress).call();
            var lpUSDTBalanceInWei = await usdtContract.methods.balanceOf(poolAddressV3).call();
            var lpUSDTBalance = parseFloat(web3ReadOnly.utils.fromWei(lpUSDTBalanceInWei, 'ether'))

            //var raiContract = new web3ReadOnly.eth.Contract(abi, raiContractAddress);
            //var lpraiBalanceInWei = await raiContract.methods.balanceOf(poolAddressV3).call();
            //var lpraiBalance = parseFloat(web3ReadOnly.utils.fromWei(lpraiBalanceInWei, 'ether'))

            //var totalLPValueInUSDT = 2 * Math.sqrt(lpraiBalance * lpUSDTBalance);
            //$scope.TotalLPValueInUSDT = totalLPValueInUSDT.toFixed(0);

            $scope.TotalLPValueInUSDT = parseFloat(lpUSDTBalance);
            var u2uBalance = web3ReadOnly.utils.fromWei(u2uInTreasury, 'ether');
            $scope.UsdtBalanceTreasury = parseFloat(u2uBalance);
            $scope.TotalTreasuryValue = $scope.TotalLPValueInUSDT + $scope.UsdtBalanceTreasury;
            CreateChartTreasury($scope.TotalLPValueInUSDT, $scope.UsdtBalanceTreasury);
            $scope.$apply();
        } catch (error) {
            ErrorManger(error, 'getU2uTreasury');
        }
    }
    async function getReferralInfo() {
        $scope.BalanceU2U = 0;
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var accountAddress = $scope.CurrentUser.address;
                var isMember = await communityContract.methods.isMember(accountAddress).call();
                if (isMember) {
                    $scope.isMember = 1;
                    var referralCounts = await communityContract.methods.getReferralCounts(accountAddress).call();
                    $scope.DirectInvitation = Number(referralCounts.directCount);
                    $scope.NumberOfTeam = Number(referralCounts.fullTreeCount) - 1;
                    var totalSalse = Number(referralCounts.fullstake);
                    var totalContribution = Number(referralCounts.fullcontribution);
                    $scope.TotalContribution = web3ReadOnly.utils.fromWei(totalContribution, 'ether');
                    $scope.TotalSale = web3ReadOnly.utils.fromWei(totalSalse, 'ether');
                    $scope.$apply();
                    var referrerAddress = await communityContract.methods.referrerOf(accountAddress).call();
                    $scope.MyReferrer = referrerAddress;
                    getDirectBondAward();
                    getReferralTreeWithStakeInfo();
                    if ($scope.MyReferrer != '0x0000000000000000000000000000000000000000') {
                        if ($scope.CurrenPage == 'invite' && $scope.MyReferrer !='') {
                            $('#txtReferrer').val($scope.TrimAccount(referrerAddress));
                            var textbox = document.getElementById('txtReferrer');
                            textbox.readOnly = true;
                            $scope.$apply();
                        };
                    };
                };
                const balanceWei = await web3ReadOnly.eth.getBalance($scope.CurrentUser.address);
                $scope.BalanceU2U = web3ReadOnly.utils.fromWei(balanceWei, 'ether');
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getReferralInfo');
            };
        };
    };
    async function getReferralTreeWithStakeInfo() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var accountAddress = $scope.CurrentUser.address;
                var jsonData = await communityContract.methods.getFullReferralTreeWithStakeInfo(accountAddress).call();
                var validJsonString = jsonData.replace('"level": ,', '"level": 0,');
                const regex = new RegExp(', "contribution"', 'g');
                let validJsonStringRp = validJsonString.replace(regex, '", "contribution"');
                var treeData = JSON.parse(validJsonStringRp);
                $scope.InvitationList = treeData;

                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getReferralTreeWithStakeInfo');
            }
        };
    };
    async function getUserVestingEntries(type) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            var accountAddress = $scope.CurrentUser.address;
            try {
                var bondArray = await yieldVestingContract.methods.getUserVestingEntries(accountAddress, type).call();
                $scope.MyBondList = bondArray.filter(x => x.totalReward != 0n);
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getUserVestingEntries');
            };
        };
    };
    $scope.TimestampToDate = function (timestamp) {
        if (timestamp == null)
            return;
        const times = Number(timestamp);
        const date = new Date(times * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return month + "/" + day + "/" + year + " " + hour + ":" + minute;
    };
    $scope.TimestampToDay = function (timestamp) {
        if (timestamp == null)
            return;
        const times = Number(timestamp);
        return times / (60 * 60 * 24);
    };
    $scope.LeftTime = function (startTimeMs, durationMs) {
        const startTime = Number(startTimeMs);
        const startDate = new Date(startTime * 1000);
        const duration = Number(durationMs);
        const endDate = new Date(startDate.getTime() + duration * 1000);
        const currentTime = new Date();
        const timeLeftMs = endDate.getTime() - currentTime.getTime();
        if (timeLeftMs > 0) {
            const days = Math.floor(timeLeftMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeftMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
            var time2Left = days + ' ' + $translate.instant("Days") + ' ' + hours + ' ' + $translate.instant("Hour") + ' ' + minutes + ' ' + $translate.instant("Minute");
            return time2Left;
        } else {
            return $translate.instant("FullyVested");
        };
    };
    $scope.Claimable = function (startTimeMs, durationMs, totalReward, releasedAmount) {
        var claimableAmount = 0n;
        const bnTotalReward = Number(totalReward);
        const bnReleasedAmount = Number(releasedAmount);
        const startTime = Number(startTimeMs);
        const startDate = new Date(startTime * 1000);
        const duration = Number(durationMs);
        const endDate = new Date(startDate.getTime() + duration * 1000);
        const currentTime = new Date();
        const timeLeftMs = endDate.getTime() - currentTime.getTime();
        if (timeLeftMs > 0) {
            var currentTimeMs = Number(currentTime);
            const timeElapsed = currentTimeMs - startTime * 1000;
            if (timeElapsed < 0n) {
                claimableAmount = 0n;
            } else {
                const proportionalReward = (bnTotalReward * timeElapsed) / (duration * 1000);
                let currentReleaseableAmount = proportionalReward - bnReleasedAmount;
                if (currentReleaseableAmount < 0n) {
                    currentReleaseableAmount = 0n;
                }
                const remainingOverall = bnTotalReward - bnReleasedAmount;
                if (currentReleaseableAmount > remainingOverall) {
                    claimableAmount = remainingOverall;
                } else {
                    claimableAmount = currentReleaseableAmount;
                }
            }
        } else {
            const remaining = bnTotalReward - bnReleasedAmount;
            if (remaining > 0n) {
                claimableAmount = remaining;
            }
        };
        var reming = $scope.FromWei(claimableAmount);
        $scope.TotaRemaining = parseFloat($scope.TotaRemaining) + parseFloat(reming);
        return reming;
    };

    $scope.LaunchApp = function () {
        if ($scope.CurrentUser == null) {
            $scope.webconnect();
        }
        else {
            location.href = 'dashboard';
        };
    };
    async function getDirectBondAward() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var userAddress = $scope.CurrentUser.address;
                var historyDirectBond = await contributionContract.methods.getBondPurchaseHistory(userAddress).call();
                $scope.DirectBondAwardList = historyDirectBond;
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getDirectBondAward');
            }
        };
    };
    if ($scope.CurrenPage == 'stake') {
        $scope.IsApproveStake = 1;
        $scope.isSRaiAppove = 0;
        $scope.isAppoveWU2U4Staking = 0;
        GetTokenValue(raiContractAddress, 5);
        GetTokenValue(principleAddress, 6);
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            checkApproveStaking();
            checksRaiAppove();
            checkAppoveWU2U4Staking();
            getUserVestingEntries('Interest');
            getStakingMyInfo();
        };
    };
    $scope.AppoveWU2U4Staking = function () {
        appoveWU2U4Staking();
    };
    function CreateChartMinting(stakedValue, circulatingValue) {
        if ($scope.CurrenPage == 'dashboard') {
            stakedValue = parseFloat(stakedValue);
            circulatingValue = parseFloat(circulatingValue);
            var divElement = document.getElementById('mintingchart');
            var background = 'conic-gradient(var(--blue) 0deg 180deg, var(--text) 0deg 360deg)';
            if (stakedValue == circulatingValue) {
                divElement.style.background = background;
                return;
            }
            else if (stakedValue > 0 && circulatingValue == 0) {
                background = 'conic-gradient(var(--blue) 0deg 360deg, var(--text) 0deg 360deg)';
                divElement.style.background = background;
                return;
            }
            else if (stakedValue == 0 && circulatingValue > 0) {
                background = 'conic-gradient(var(--blue) 0deg 0deg, var(--text) 0deg 360deg)';
                divElement.style.background = background;
                return;
            }
            else if (stakedValue == null || circulatingValue == null || stakedValue == 0 || circulatingValue == 0 || $scope.CurrenPage != 'dashboard') {
                return;
            };
            var degrees1 = (circulatingValue / (stakedValue + circulatingValue)) * 360;
            background = 'conic-gradient(var(--blue) 0deg ' + degrees1.toFixed(0) + 'deg, var(--text) 0deg 360deg)';
            divElement.style.background = background;
            divElement.style.transform = 'rotate(-100deg)';
        };
    };
    function CreateChartTreasury(totalLPValueInUSDT, usdtBalance) {
        if ($scope.CurrenPage == 'dashboard') {
            totalLPValueInUSDT = parseFloat(totalLPValueInUSDT);
            usdtBalance = parseFloat(usdtBalance);
            var divElement = document.getElementById('treasurychart');
            var background = 'conic-gradient(var(--blue) 0deg 180deg, var(--text) 0deg 360deg)';
            if (totalLPValueInUSDT == usdtBalance) {
                divElement.style.background = background;
                return;
            }
            else if (totalLPValueInUSDT == 0 && usdtBalance > 0) {
                background = 'conic-gradient(var(--blue) 0deg 360deg, var(--text) 0deg 360deg)';
                divElement.style.background = background;
                return;
            }
            else if (totalLPValueInUSDT > 0 && usdtBalance == 0) {
                background = 'conic-gradient(var(--blue) 0deg 0deg, var(--text) 0deg 360deg)';
                divElement.style.background = background;
                return;
            }
            else if (totalLPValueInUSDT == null || usdtBalance == null || totalLPValueInUSDT == 0 || usdtBalance == 0 || $scope.CurrenPage != 'dashboard') {
                return;
            };
            var degrees1 = (totalLPValueInUSDT / (totalLPValueInUSDT + usdtBalance)) * 360;
            background = 'conic-gradient(var(--blue) 0deg ' + degrees1.toFixed(0) + 'deg, var(--text) 0deg 360deg)';
            if (divElement) {
                divElement.style.background = background;
                divElement.style.transform = 'rotate(-100deg)';
            };
        };
    };

    $scope.MaxAmountStake = function () {
        $('#txtAmountStake').val(floorToDecimal($scope.BalanceRai,4));
    };
    $scope.StakeRAI = function () {
        var isvalidate = true;
        var value = $('#txtAmountStake').val();
        var amount = getAmountOutValue(value);
        if (amount == null || amount.trim() == '') {
            ValidateMsg('txtAmountStake', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amount)) {
            ValidateMsg('txtAmountStake', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount <= 0) {
            ValidateMsg('txtAmountStake', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount > $scope.BalanceRai) {
            ValidateMsg('txtAmountStake', $translate.instant("InsufficientBalance"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        if ($scope.IsLongStake == 1) {
            var stakingDuration = $('#stakingDuration').val();
            stakeLongRAI(amount, stakingDuration);
        }
        else {
            stakeRAI(amount);
        };
    };
    $scope.MaxAmountUnStake = function () {
        $('#txtAmountUnStake').val(floorToDecimal($scope.PrincipalAmount - $scope.YourWarmupBalance,4));
    };
    $scope.UnStakeRAI = function () {
        var isvalidate = true;
        var value = $('#txtAmountUnStake').val();
        var amount = getAmountOutValue(value);
        if (amount == null || amount.trim() == '') {
            ValidateMsg('txtAmountUnStake', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amount)) {
            ValidateMsg('txtAmountUnStake', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount <= 0) {
            ValidateMsg('txtAmountUnStake', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount > ($scope.PrincipalAmount - $scope.YourWarmupBalance)) {
            ValidateMsg('txtAmountUnStake', $translate.instant("InsufficientBalance"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        unStakeRAI(floorToDecimal(amount,4));
    };

    if ($scope.CurrenPage == 'invite') {
        var ref = UrlParam.get.ref;
        if (ref != null && ref != '' && isValidEthAddressRegex(ref)) {
            localStorage.setItem('raifiRef', ref);
        }
        else {
            ref = localStorage.getItem('raifiRef');
        };
        if (ref != null && ref != '') {
            $('#txtReferrer').val($scope.TrimAccount(ref));
            $scope.MyReferrer = ref;
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            var linkRef = window.location.origin + '/invite.html?ref=' + $scope.CurrentUser.address;
            $('#txtReferral').val(linkRef);
            $scope.LinkRef = linkRef;
            $('#txtReferralCode').val($scope.TrimAccount($scope.CurrentUser.address));
        };
    };
    function isValidEthAddressRegex(address) {
        if (!address || typeof address !== 'string') {
            return false;
        }
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        return ethAddressRegex.test(address);
    }
    $scope.CopyLink = function () {
        CopyValue($scope.LinkRef);
    };
    $scope.CopyCode = function () {
        CopyValue($scope.CurrentUser.address);
    };
    $scope.JoinCommunity = function () {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            var joinRef = localStorage.getItem('raifiRef');
            if (joinRef == null || joinRef == '') {
                joinRef = '0x0000000000000000000000000000000000000000';
            };
            if ($scope.CurrentUser.address != joinRef) {
                joinMember();
            };
        };
    };
    $scope.ShortenAddress = function (fullAddress) {
        if (!fullAddress || typeof fullAddress !== 'string') {
            return '';
        }
        if (fullAddress.length <= 18) {
            return fullAddress;
        }
        var start = fullAddress.substring(0, 5);
        var end = fullAddress.substring(fullAddress.length - 8);
        return `${start}...${end}`;
    };

    if ($scope.CurrenPage == 'contribution') {
        $scope.ContributionFactor = 0;
        $scope.TeamContributionValue = 0;
        $scope.ContributionWeightReward = 0;
        $scope.DailyNewRewards = 0;
        $scope.RankingRewards = 0;
        $scope.BondDirectReferralRewards = 0;
        $scope.ContributionValueRewardsEarned = 0;
        $scope.TopContributors = [];
        $scope.isApproveClaimContributionReward = 0;
        $scope.isApproveBurnContributionReward = 0;
        $scope.SystemContributionValue = 0;
        $scope.RecentCommissionPayout = 0;
        getTop99Contributors();
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            GetTokenValue(principleAddress, 6);
            GetTokenValue(raiContractAddress, 5);
            getUserVestingEntries('Contribution');
            getMyContributors();
            getRewardHistory();
            checkApproveClaimContributionReward();
            checkApproveBurnContributionReward();
        };
    };
    async function getRewardHistory() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            var accountAddress = $scope.CurrentUser.address;
            try {
                var rewardHistory = await contributionContract.methods.getRewardHistory(accountAddress).call();
                $scope.RewardHistoryList = rewardHistory;
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getRewardHistory');
            };
        };
    };
    $scope.ConfirmDestroyed = function () {
        var isvalidate = true;
        var value = $('#txtConfirmDestroyed').val();
        var amount = getAmountOutValue(value);
        if (amount == null || amount.trim() == '') {
            ValidateMsg('txtConfirmDestroyed', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amount)) {
            ValidateMsg('txtConfirmDestroyed', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        amount = floorToDecimal(amount,4);
        if (amount <= 0) {
            ValidateMsg('txtConfirmDestroyed', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount > $scope.BalanceRai) {
            ValidateMsg('txtConfirmDestroyed', $translate.instant("InsufficientBalance"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        confirmDestroyed(amount);
    };
    async function confirmDestroyed(burnAmount) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var burnAmountInWei = web3ReadOnly.utils.toWei(burnAmount.toString(), 'ether');
                var contract = new $scope.web3.eth.Contract(contributionContractABI, contributionContractAddress);
                var unstakeTx = await contract.methods.destroyed(
                    burnAmountInWei
                );
                var gasEstimate = await unstakeTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: contributionContractAddress,
                    data: unstakeTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('DestroyedSuccessfully'), 'success');
                    $('#txtConfirmDestroyed').val('');
                    GetTokenValue(raiContractAddress, 5);
                };
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'confirmDestroyed');
            }
        }
    };
    $scope.ConfirmContribution = function (typeBurn) {
        withdrawRewardWithDiscount(typeBurn, $scope.ClainTypeInterest)
    };
    async function withdrawRewardWithDiscount(typeBurn, withdrawDays) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            try {
                BlockUI();
                var fromAccount = $scope.CurrentUser.address;
                var contract = new $scope.web3.eth.Contract(contributionContractABI, contributionContractAddress);
                const gasEstimate = await contract.methods
                    .withdrawRewardWithDiscount(typeBurn, withdrawDays)
                    .estimateGas({ from: fromAccount });

                const receipt = await contract.methods
                    .withdrawRewardWithDiscount(typeBurn, withdrawDays)
                    .send({ from: fromAccount, gas: gasEstimate });
                if (receipt) {
                    NotificConfirm('', $translate.instant("ConfirmSuccessfully"), 'success');
                };
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'withdrawRewardWithDiscount');
            }
        }
    }
    async function getMyContributors() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var userAddress = $scope.CurrentUser.address;
                const contributionWeightRewards = await contributionContract.methods.getContributionWeightRewardsEarned(userAddress).call();
                const dailyNewContributionRewards = await contributionContract.methods.getDailyNewContributionRewardsEarned(userAddress).call();
                const contributionRankingRewards = await contributionContract.methods.getContributionRankingRewardsEarned(userAddress).call();
                const bondSalesIncentiveRewards = await contributionContract.methods.getTotalBondIncentiveRewardsEarned(userAddress).call();
                const myContributionValue = await contributionContract.methods.totalContributionValue(userAddress).call();
                $scope.ContributionWeightReward = web3ReadOnly.utils.fromWei(contributionWeightRewards, 'ether');
                $scope.DailyNewRewards = web3ReadOnly.utils.fromWei(dailyNewContributionRewards, 'ether');
                $scope.RankingRewards = web3ReadOnly.utils.fromWei(contributionRankingRewards, 'ether');
                $scope.BondDirectReferralRewards = web3ReadOnly.utils.fromWei(bondSalesIncentiveRewards, 'ether');
                $scope.ContributionFactor = parseFloat($scope.ContributionWeightReward) + parseFloat($scope.DailyNewRewards) + parseFloat($scope.RankingRewards) + parseFloat($scope.BondDirectReferralRewards);
                $scope.TeamContributionValue = web3ReadOnly.utils.fromWei(myContributionValue, 'ether');
                const totalContributionValueRewardsEarned = await contributionContract.methods.totalContributionValueRewardsEarned(userAddress).call();
                $scope.ContributionValueRewardsEarned = web3ReadOnly.utils.fromWei(totalContributionValueRewardsEarned, 'ether');
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getMyContributors');
            }
        }
        $http.get(servicelink + 'api/Pulic/Contribution')
            .then(function (response) {
                $scope.SystemContributionValue = response.data.totalContribution;
                $scope.RecentCommissionPayout = response.data.recentCommissionPayout;
            })
            .catch(function (errorResponse) {
            });
    }
    $scope.ApproveClaimContributionReward = function () {
        approveClaimContributionReward();
    };
    async function approveClaimContributionReward() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            BlockUI();
            try {
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, principleAddress);
                var tx = await tokenContract.methods.approve(contributionContractAddress, unlimitedValue).send({ from: account });
                if (tx) {
                    UnBlockUI();
                    $scope.isApproveClaimContributionReward = 2;
                    $scope.$apply();
                }
            } catch (error) {
                ErrorManger(error, 'approveBond');
            }
        };
    };
    async function checkApproveClaimContributionReward() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, principleAddress, contributionContractAddress);
                if (appoveAmount > 0) {
                    $scope.isApproveClaimContributionReward = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkApproveBond');
            }
        };
    };

    $scope.ApproveBurnContributionReward = function () {
        approveBurnContributionReward();
    };
    async function approveBurnContributionReward() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            BlockUI();
            try {
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, raiContractAddress);
                var tx = await tokenContract.methods.approve(contributionContractAddress, unlimitedValue).send({ from: account });
                if (tx) {
                    UnBlockUI();
                    $scope.isApproveBurnContributionReward = 2;
                    $scope.$apply();
                }
            } catch (error) {
                ErrorManger(error, 'approveBond');
            }
        };
    };
    async function checkApproveBurnContributionReward() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, raiContractAddress, contributionContractAddress);
                if (appoveAmount > 0) {
                    $scope.isApproveBurnContributionReward = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkApproveBond');
            }
        };
    };

    async function getTop99Contributors() {
        if (web3ReadOnly) {
            try {
                const result = await contributionContract.methods.getTop99Contributors().call();
                const topAddresses = result._topAddresses;
                const minTopValue = result._minValue;
                $scope.TopContributors = topAddresses;
                if (topAddresses.length > 0) {
                    $scope.MinimumContributionValue = web3ReadOnly.utils.fromWei(minTopValue, 'ether');
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'getTop99Contributors');
            }
        }
    };
    if ($scope.CurrenPage == 'bond') {
        $scope.BondPrice = 0;
        $scope.AmountBuyBond;
        $scope.IsApproveBond = 1;
        $scope.TotaRemaining = 0;
        getUserVestingEntries('Bond');
        checkBondPurchaseEnabled();
        checkLpBondPurchaseEnabled();
        checkApproveBond();
        getBondPrice(true);
    };
    $scope.ApproveBond = function () {
        approveBond();
    };
    $scope.ClaimVesting = function (type) {
        releaseVesting(type);
    };
    async function releaseVesting(type) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            try {
                BlockUI();
                var userAddress = $scope.CurrentUser.address;
                var contract = new $scope.web3.eth.Contract(yieldVestingABI, yieldVestingAddress);
                const transaction = await contract.methods.releaseVesting(userAddress, type).send({
                    from: userAddress,
                });
                if (transaction) {
                    NotificConfirm('', $translate.instant("ClaimSuccessfully"), 'success');
                    getUserVestingEntries(type);
                }
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'releaseVesting');
            }
        }
    }
    const unlimitedValue = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    async function approveBond() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            BlockUI();
            try {
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, principleAddress);
                var tx = await tokenContract.methods.approve(bondContractAddress, unlimitedValue).send({ from: account });
                if (tx) {
                    UnBlockUI();
                    $scope.IsApproveBond = 2;
                    $scope.$apply();
                }
            } catch (error) {
                ErrorManger(error, 'approveBond');
            }
        };
    };
    async function checkApproveBond() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, principleAddress, bondContractAddress);
                if (appoveAmount > 0) {
                    $scope.IsApproveBond = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkApproveBond');
            }
        };
    };
    async function getSwapQuoteV3(amountIn, tokenInAddress, tokenOutAddress, type) {
        if (web3ReadOnly) {
            if (tokenInAddress == tokenOutAddress) {
                if (type == 1) {
                    $('#txtAmountIn').val(parseFloat(amountIn));
                }
                else {
                    $('#txtAmountOut').val(parseFloat(amountIn));
                }
            };
            var quoterContract = new web3ReadOnly.eth.Contract(pancakeswapV3QuoterABI, pancakeswapV3QuoterAddress);
            var amountInWei = web3ReadOnly.utils.toWei(amountIn, 'ether');
            try {
                var FEE_AMOUNT = 10000;
                var params = {
                    tokenIn: tokenInAddress,
                    tokenOut: tokenOutAddress,
                    amountIn: amountInWei,
                    fee: FEE_AMOUNT,
                    sqrtPriceLimitX96: 0
                };
                var quote = await quoterContract.methods.quoteExactInputSingle(params).call();
                if (quote) {
                    var amountsOut = quote.amountOut;
                    var amoutAccept = web3ReadOnly.utils.fromWei(amountsOut, 'ether');
                    if (type == -1) {
                        return amoutAccept;
                    }
                    else if (type == 1) {
                        if ($scope.SellFeeRatio > 0 && tokenInAddress == raiContractAddress) {
                            var amountAfterFee = parseFloat(amoutAccept) - parseFloat(amoutAccept) * $scope.SellFeeRatio / $scope.Precision;
                            $('#txtAmountIn').val(floorToDecimal(amountAfterFee,8));
                        }
                        else {
                            $('#txtAmountIn').val(floorToDecimal(amoutAccept,8));
                        }
                    }
                    else {
                        if ($scope.SellFeeRatio > 0 && tokenOutAddress == raiContractAddress) {
                            var amountAfterFee = parseFloat(amoutAccept) + parseFloat(amoutAccept) * $scope.SellFeeRatio / $scope.Precision;
                            $('#txtAmountOut').val(floorToDecimal(amountAfterFee,8));
                        }
                        else {
                            $('#txtAmountOut').val(floorToDecimal(amoutAccept,8));
                        }
                    }
                } else {
                    return null;
                }
            } catch (error) {
                ErrorManger(error, 'getSwapQuoteV3');
            }
        }
    }
    async function approveSwap(type) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            BlockUI();
            try {
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var contractApprove = raiContractAddress;
                if (type == 1) {
                    contractApprove = principleAddress;
                }
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, contractApprove);
                var tx = await tokenContract.methods.approve(pancakeswapV3RouterAddress, unlimitedValue).send({ from: account });
                if (tx) {
                    UnBlockUI();
                    $scope.IsApproveSwap = 2;
                    $scope.$apply();
                }
            } catch (error) {
                ErrorManger(error, 'approveSwap');
            }
        };
    };
    async function checkapproveSwap(type) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                var contractApprove = raiContractAddress;
                if (type == 1) {
                    contractApprove = principleAddress;
                }
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, contractApprove, pancakeswapV3RouterAddress);
                if (appoveAmount > 0) {
                    $scope.IsApproveSwap = 2;
                }
                else {
                    $scope.IsApproveSwap = 1;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkapproveSwap');
            }
        };
    };

    async function unwrapWbnb(amountWbnb) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                const wbnbContract = new $scope.web3.eth.Contract(principleContractABI, principleAddress);
                var account = $scope.CurrentUser.address;
                const gasEstimate = await wbnbContract.methods.withdraw(amountWbnb).estimateGas({ from: account });
                const transaction = await wbnbContract.methods.withdraw(amountWbnb).send({
                    from: account,
                    gas: gasEstimate
                });
                if (transaction) {
                    UnBlockUI();
                    NotificConfirm('', $translate.instant('SwapSuccessfully'), 'success');
                    $('#txtAmountOut').val('');
                    $('#txtAmountIn').val('');
                    GetUserTokenSwap();
                    $scope.$apply();
                };

            } catch (error) {
                ErrorManger(error, 'unwrapWbnb');
            }
        }
    }
    async function wrapBNB(amountInBNB) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            try {
                BlockUI();
                var account = $scope.CurrentUser.address;
                const wbnbContract = new $scope.web3.eth.Contract(principleContractABI, principleAddress);
                const gasEstimate = await wbnbContract.methods.deposit().estimateGas({ from: account, value: amountInBNB });
                const transaction = await wbnbContract.methods.deposit().send({
                    from: account,
                    gas: gasEstimate,
                    value: amountInBNB
                });
                if (transaction) {
                    UnBlockUI();
                    NotificConfirm('', $translate.instant('SwapSuccessfully'), 'success');
                    $('#txtAmountOut').val('');
                    $('#txtAmountIn').val('');
                    GetUserTokenSwap();
                    $scope.$apply();
                };
            } catch (error) {
                ErrorManger(error, 'wrapBNB');
            }
        }
    }

    async function executeSwapV3(amountIn, tokenInAddress, tokenOutAddress) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            var fee = 10000;
            var amountOutMin = 0;
            var account = $scope.CurrentUser.address;
            var recipientAddress = account;
            var routerContract = new $scope.web3.eth.Contract(pancakeswapV3RouterABI, pancakeswapV3RouterAddress);
            var amountInWei = $scope.web3.utils.toWei(amountIn, 'ether');
            var amountOutMinWei = $scope.web3.utils.toWei(amountOutMin, 'ether');
            var deadline = Math.floor(Date.now() / 1000) + 60 * 20;
            var params = {
                tokenIn: tokenInAddress,
                tokenOut: tokenOutAddress,
                fee: fee,
                recipient: recipientAddress,
                deadline: deadline,
                amountIn: amountInWei,
                amountOutMinimum: amountOutMinWei,
                sqrtPriceLimitX96: 0,
            };
            if ($scope.SwapInSymbol == 'RAI' && $scope.SwapOutSymbol == 'U2U') {
                var valueInWei = amountInWei;
                try {
                    BlockUI();
                    var gasEstimateWai = await routerContract.methods.exactInputSingle(params).estimateGas({ from: account, value: valueInWei });
                    var gasEstimate = $scope.web3.utils.fromWei(gasEstimateWai, 'ether');
                    gasEstimate += 50000;
                    var gasEstimateSend = $scope.web3.utils.toWei(gasEstimate, 'ether');
                    var transaction = await routerContract.methods.exactInputSingle(params).send({
                        from: account,
                        value: valueInWei,
                        gas: gasEstimateSend
                    });
                    if (transaction) {
                        UnBlockUI();
                        NotificConfirm('', $translate.instant('SwapSuccessfully'), 'success');
                        $('#txtAmountOut').val('');
                        $('#txtAmountIn').val('');
                        GetUserTokenSwap();
                        $scope.$apply();
                    }
                } catch (error) {
                    ErrorManger(error, 'executeSwapV3');
                }
            }
            else {
                try {
                    BlockUI();
                    const balanceBeforeWei = await usdtContract.methods.balanceOf(account).call();
                    var gasEstimateWai = await routerContract.methods.exactInputSingle(params).estimateGas({ from: account });
                    var gasEstimate = $scope.web3.utils.fromWei(gasEstimateWai, 'ether');
                    gasEstimate += 50000;
                    var gasEstimateSend = $scope.web3.utils.toWei(gasEstimate, 'ether');
                    var transaction = await routerContract.methods.exactInputSingle(params).send({
                        from: account,
                        gas: gasEstimateSend
                    });
                    if (transaction) {
                        if ($scope.SwapInSymbol == 'U2U' && $scope.SwapOutSymbol == 'RAI') {
                            const balanceAfterWei = await usdtContract.methods.balanceOf(account).call();
                            var receivedWBNBWei = new BigNumber(balanceAfterWei) - new BigNumber(balanceBeforeWei);
                            await unwrapWbnb(receivedWBNBWei);
                        }
                        else {
                            UnBlockUI();
                            NotificConfirm('', $translate.instant('SwapSuccessfully'), 'success');
                            $('#txtAmountOut').val('');
                            $('#txtAmountIn').val('');
                            GetUserTokenSwap();
                            $scope.$apply();
                        }
                    }
                } catch (error) {
                    ErrorManger(error, 'executeSwapV3');
                }
            }


        }
    }
    
    async function stakeRAI(amountToStake) {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var amountInWei = $scope.web3.utils.toWei(amountToStake.toString(), 'ether');
                var stakeTx = await stakingContract.methods.stake(amountInWei);
                var stakeGasEstimate = await stakeTx.estimateGas({ from: accountAddress });
                var stakeReceipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingAddress,
                    data: stakeTx.encodeABI(),
                    gas: stakeGasEstimate,
                });
                if (stakeReceipt) {
                    NotificConfirm('', $translate.instant('StakeSuccessfully'), 'success');
                    $('#txtAmountStake').val('');
                    $('#StakeForm').modal('hide');
                    UnBlockUI();
                    $scope.$apply();
                    GetTokenValue(raiContractAddress, 5);
                    getStakingMyInfo();
                }
            } catch (error) {
                ErrorManger(error, 'stakeRAI');
            }
        }
    };
    async function stakeLongRAI(amountToStake, stakingDuration) {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var amountInWei = $scope.web3.utils.toWei(amountToStake.toString(), 'ether');
                var stakeTx = await stakingLongContract.methods.stake(amountInWei, stakingDuration);
                var stakeGasEstimate = await stakeTx.estimateGas({ from: accountAddress });
                var stakeReceipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingLongAddress,
                    data: stakeTx.encodeABI(),
                    gas: stakeGasEstimate,
                });
                if (stakeReceipt) {
                    NotificConfirm('', $translate.instant('StakeSuccessfully'), 'success');
                    $('#txtAmountStake').val('');
                    $('#StakeForm').modal('hide');
                    UnBlockUI();
                    $scope.$apply();
                    GetTokenValue(raiContractAddress, 5);
                    getStakingMyInfo();
                }
            } catch (error) {
                ErrorManger(error, 'stakeRAI');
            }
        }
    };
    async function checkAllowance(ownerAddress, allowContractAddress, checkingContractAddress) {
        var abi = [{ "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
        var raiAllowanceContract = new web3ReadOnly.eth.Contract(abi, allowContractAddress);
        try {
            var allowance = await raiAllowanceContract.methods.allowance(ownerAddress, checkingContractAddress).call();
            return allowance;
        } catch (error) {
            ErrorManger(error, 'checkAllowance');
        }
    }
    async function approveStaking() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                BlockUI();
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, raiContractAddress);
                var tx = await tokenContract.methods.approve(stakingAddress, unlimitedValue).send({ from: account });
                $scope.IsApproveStake = 2;
                UnBlockUI();
                $scope.$apply();
            }
            catch (error) {
                ErrorManger(error, 'approveStaking');
            };
        };
    };
    async function checkApproveStaking() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, raiContractAddress, stakingAddress);
                if (appoveAmount > 0) {
                    $scope.IsApproveStake = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkApproveStaking');
            }
        };
    };
    async function checkAppoveWU2U4Staking() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, principleAddress, stakingAddress);
                if (appoveAmount > 0) {
                    $scope.isAppoveWU2U4Staking = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkAppoveWU2U4Staking');
            }
        };
    };
    async function appoveWU2U4Staking() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                BlockUI();
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, principleAddress);
                var tx = await tokenContract.methods.approve(stakingAddress, unlimitedValue).send({ from: account });
                $scope.isAppoveWU2U4Staking = 2;
                UnBlockUI();
                $scope.$apply();
            }
            catch (error) {
                ErrorManger(error, 'approveStaking');
            };
        };
    };
    async function approveStakingLong() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                BlockUI();
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContract = new $scope.web3.eth.Contract(ERC20_ABI, raiContractAddress);
                var tx = await tokenContract.methods.approve(stakingLongAddress, unlimitedValue).send({ from: account });
                $scope.IsApproveStake = 2;
                UnBlockUI();
                $scope.$apply();
            }
            catch (error) {
                ErrorManger(error, 'approveStaking');
            };
        };
    };
    async function checkApproveStakingLong() {
        if ($scope.web3 == null) {
            await initWeb3();
        };
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            }
            try {
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, raiContractAddress, stakingLongAddress);
                if (appoveAmount > 0) {
                    $scope.IsApproveStake = 2;
                };
                $scope.$apply();
            } catch (error) {
                ErrorManger(error, 'checkApproveStaking');
            }
        };
    };
    $scope.ApproveStake = function () {
        if ($scope.IsLongStake == 1) {
            approveStakingLong();
        }
        else {
            approveStaking();
        }
    };

    async function sRaiAppove() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            try {
                BlockUI();
                var account = $scope.CurrentUser.address;
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokensRaiContract = new $scope.web3.eth.Contract(ERC20_ABI, sRaiContractAddress);
                var tx = await tokensRaiContract.methods.approve(stakingAddress, unlimitedValue).send({ from: account });
                if (tx) {
                    $scope.isSRaiAppove = 2;
                    UnBlockUI();
                    $scope.$apply();
                };
            }
            catch (error) {
                ErrorManger(error, 'sRaiAppove');
            };
        };
    };
    async function checksRaiAppove() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                }
                var appoveAmount = await checkAllowance($scope.CurrentUser.address, sRaiContractAddress, stakingAddress);
                if (appoveAmount > 0) {
                    $scope.isSRaiAppove = 2;
                    $scope.$apply();
                };

            } catch (error) {
                ErrorManger(error, 'checksRaiAppove');
            }
        };
    };
    $scope.sRaiAppove = function () {
        sRaiAppove();
    };
    async function unStakeRAI(amount) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var amountInWei = $scope.web3.utils.toWei(amount.toString(), 'ether');
                var unstakeTx = await stakingContract.methods.unstake(
                    amountInWei
                );
                var gasEstimate = await unstakeTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingAddress,
                    data: unstakeTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('UnstakeSuccessfully'), 'success');
                    $('#txtAmountUnStake').val('');
                    $('#UnStakeForm').modal('hide');
                    getStakingMyInfo();
                };
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'unStakeRAI');
            }
        }
    };
    async function claimApy(amount, duration) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var amountInWei = $scope.web3.utils.toWei(amount.toString(), 'ether');
                var unstakeTx = await stakingContract.methods.ClaimApy(
                    amountInWei,
                    duration
                );
                var gasEstimate = await unstakeTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingAddress,
                    data: unstakeTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('ClaimSuccessfully'), 'success');
                    $('#txtAmountInterest').val('');
                    getStakingMyInfo();
                };
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'unStakeRAI');
            }
        }
    };
    $scope.OpenStakeForm = function (type) {
        $scope.IsLongStake = type;
        $scope.IsApproveStake = 1;
        if ($scope.IsLongStake == 1) {
            checkApproveStakingLong();
        }
        else {
            checkApproveStaking();
        }
    };
    $scope.ClaimInterest = function () {
        var isvalidate = true;
        var value = $('#txtAmountInterest').val();
        var amount = getAmountOutValue(value);
        if (amount == null || amount.trim() == '') {
            ValidateMsg('txtAmountInterest', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amount)) {
            ValidateMsg('txtAmountInterest', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount <= 0) {
            ValidateMsg('txtAmountInterest', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount > $scope.Interest) {
            ValidateMsg('txtAmountInterest', $translate.instant("InsufficientBalance"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        var day = $scope.ClainTypeInterest;
        claimApy(floorToDecimal(amount,4), day);
    };
    $scope.ChangeAmountInterest = function () {
        var value = $('#txtAmountInterest').val();
        var amount = getAmountOutValue(value);
        if (isFloat(amount)) {
            $scope.ClainAmountInterest = amount;
        }
        else {
            $scope.ClainAmountInterest = 0;
        };
    };
    $scope.ChooseType = function (type) {
        $scope.ClainTypeInterest = type;
        const buttons = document.querySelectorAll('.list-btn .button');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                buttons.forEach(btn => {
                    btn.classList.remove('active-button');
                });
                this.classList.add('active-button');
            });
        });
    };
    $scope.MaxAmountInterest = function () {
        $('#txtAmountInterest').val(floorToDecimal($scope.Interest, 4));
        var value = $('#txtAmountInterest').val();
        var amount = getAmountOutValue(value);
        if (isFloat(amount)) {
            $scope.ClainAmountInterest = amount;
        }
        else {
            $scope.ClainAmountInterest = 0;
        };
    };

    async function joinMember() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            var accountAddress = $scope.CurrentUser.address;
            if ($scope.isMember == 1) {
                if ($scope.MyReferrer === '0x0000000000000000000000000000000000000000') {
                    try {
                        var joinRef = localStorage.getItem('raifiRef');
                        if (joinRef == null || joinRef == '') {
                            joinRef = '0x0000000000000000000000000000000000000000';
                        };
                        if (joinRef == null || joinRef == '' || joinRef == '0x0000000000000000000000000000000000000000') {
                            ValidateMsg('txtReferrer', $translate.instant("ReferrerIsRequired"));
                            return;
                        };
                        BlockUI();
                        var joinCommunityData = communityContract.methods.updateReferrer(joinRef).encodeABI();
                        var gasjoinCommunity = await $scope.web3.eth.estimateGas({ from: accountAddress, to: communityContractAddress, data: joinCommunityData });
                        var txObject = {
                            from: accountAddress,
                            to: communityContractAddress,
                            data: joinCommunityData,
                            gas: gasjoinCommunity
                        };
                        var receipt = await $scope.web3.eth.sendTransaction(txObject);
                        if (receipt) {
                            NotificConfirm('', $translate.instant("UpdateSuccessfully"), 'success');
                            getReferralInfo();
                        }
                    } catch (error) {
                        ErrorManger(error, 'joinCommunity');
                    };
                };
            }
            else {
                try {
                    BlockUI();
                    var joinRef = localStorage.getItem('raifiRef');
                    if (joinRef == null || joinRef == '') {
                        joinRef = '0x0000000000000000000000000000000000000000';
                    };
                    var joinCommunityData = communityContract.methods.joinCommunity(joinRef).encodeABI();
                    var gasjoinCommunity = await $scope.web3.eth.estimateGas({ from: accountAddress, to: communityContractAddress, data: joinCommunityData });
                    var txObject = {
                        from: accountAddress,
                        to: communityContractAddress,
                        data: joinCommunityData,
                        gas: gasjoinCommunity
                    };
                    var receipt = await $scope.web3.eth.sendTransaction(txObject);
                    if (receipt) {
                        NotificConfirm('', $translate.instant("JoinSuccessfully"), 'success');
                        getReferralInfo();
                    }
                } catch (error) {
                    ErrorManger(error, 'joinCommunity');
                };
            };
        };
    };
    async function GetTokenValue(contractAddress, type) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if (web3ReadOnly) {
                try {
                    var abi = [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
                    var tokenContract = new web3ReadOnly.eth.Contract(abi, contractAddress);
                    var result = await tokenContract.methods.balanceOf($scope.CurrentUser.address).call();
                    var format = web3ReadOnly.utils.fromWei(result, 'ether');
                    if (type == 1) {
                        $scope.BalanceIn = roundDown4(format);
                    }
                    else if (type == 5) {
                        $scope.BalanceRai = roundDown4(format);
                    }
                    else if (type == 6) {
                        $scope.WU2UBalance = roundDown4(format);
                    }
                    else if (type == 10) {
                        $scope.Available4BuyBond = roundDown4(format);
                    }
                    else {
                        $scope.BalanceOut = roundDown4(format);
                    }
                    $scope.$apply();
                } catch (error) {
                    ErrorManger(error, 'GetTokenValue');
                }
            };
        };
    };
    function roundDown4(number) {
        var number = parseFloat(number);
        var factor = Math.pow(10, 4);
        return Math.floor(number * factor) / factor;
    }
    async function claimWarmup() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var claimTx = await stakingContract.methods.claim();
                var gasEstimate = await claimTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingAddress,
                    data: claimTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('ClaimSuccessfully'), 'success');
                    getStakingMyInfo();
                }
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'claimWarmup');
            };
        };
    };
    async function buyBond(amount) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var amountInWei = web3ReadOnly.utils.toWei(amount.toString(), 'ether');
                var isLiquidityBond = $scope.isLiquidityBond;
                var depositTx = await bondContract.methods.deposit(
                    amountInWei,
                    isLiquidityBond
                );
                var gasEstimate = await depositTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: bondContractAddress,
                    data: depositTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('BuySuccessfully'), 'success');
                    $('#txtAmountBuyBond').val('');
                    $('#BuyBondForm').modal('hide');
                    getUserVestingEntries("Bond");
                    getU2uTreasury();
                    $scope.$apply();
                }

            } catch (error) {
                ErrorManger(error, 'buyBond');
            }
        };
    };
    $scope.ClaimWarmup = function () {
        if ($scope.YourWarmupAvailable > 0) {
            claimWarmup();
        };
    };
    $scope.ClaimWarmupLong = function () {
        if ($scope.YourWarmupAvailableLong > 0) {
            claimWarmupLong();
        };
    };
    async function claimWarmupLong() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                BlockUI();
                var accountAddress = $scope.CurrentUser.address;
                var claimTx = await stakingLongContract.methods.claim();
                var gasEstimate = await claimTx.estimateGas({ from: accountAddress });
                var receipt = await $scope.web3.eth.sendTransaction({
                    from: accountAddress,
                    to: stakingLongAddress,
                    data: claimTx.encodeABI(),
                    gas: gasEstimate,
                });
                if (receipt) {
                    NotificConfirm('', $translate.instant('ClaimSuccessfully'), 'success');
                    getStakingMyInfo();
                }
                UnBlockUI();
            } catch (error) {
                ErrorManger(error, 'claimWarmup');
            };
        };
    };
    async function getBondPrice(isLiquidityBond) {
        try {
            var priceInU2U = await bondContract.methods.bondPriceInUSD(isLiquidityBond).call();
            $scope.BondPrice = web3ReadOnly.utils.fromWei(priceInU2U, 'ether');
            $scope.$apply();
            UnBlockUI();
        } catch (error) {
            ErrorManger(error, 'getBondPrice');
        }
    }
    async function checkBondPurchaseEnabled() {
        try {
            var isEnabled = await bondContract.methods.bondPurchaseEnabled().call();
            $scope.IsEnabledBond = isEnabled;
        } catch (error) {
            ErrorManger(error, 'checkBondPurchaseEnabled');
        }
    };
    async function checkLpBondPurchaseEnabled() {
        try {
            var isEnabled = await bondContract.methods.lpbondPurchaseEnabled().call();
            $scope.IsEnabledBondLP = isEnabled;
        } catch (error) {
            ErrorManger(error, 'checkLpBondPurchaseEnabled');
        }
    };
    $scope.ActiveBondForm = function (type) {
        $scope.isLiquidityBond = false;
        GetTokenValue(principleAddress, 10);
        if (type == 'WU2U') {
            $scope.isLiquidityBond = false;
        }
        else {
            $scope.isLiquidityBond = true;;
        };
        BlockUI();
        getBondPrice($scope.isLiquidityBond);
    };
    $scope.MaxAmountBuyBond = function () {
        $('#txtAmountBuyBond').val(floorToDecimal($scope.Available4BuyBond,4));
    };

    $scope.BuyBond = function () {
        var value = $('#txtAmountBuyBond').val();
        var amount = getAmountOutValue(value);
        var isvalidate = true;
        if (amount == null || amount.trim() == '') {
            ValidateMsg('txtAmountBuyBond', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amount)) {
            ValidateMsg('txtAmountBuyBond', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amount <= 0) {
            ValidateMsg('txtAmountBuyBond', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        };
        if ($scope.Available4BuyBond < amount) {
            ValidateMsg('txtAmountBuyBond', $translate.instant("InsufficientBalance"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        buyBond(amount);
    };
    $scope.SetSwapIn = function (currency) {
        $('#txtAmountIn').val('');
        $('#txtAmountOut').val('');
        $scope.SwapInSymbol = currency;
        if (currency == 'U2U' || currency == 'WU2U') {
            $scope.SwapInContract = principleAddress;
            if ($scope.SwapInSymbol == $scope.SwapOutSymbol) {
                $scope.SwapOutSymbol = 'RAI';
                $scope.SwapOutContract = raiContractAddress;
            }
        }
        else if (currency == 'RAI') {
            $scope.SwapInContract = raiContractAddress;
            if ($scope.SwapInSymbol == $scope.SwapOutSymbol) {
                $scope.SwapOutSymbol = 'U2U';
                $scope.SwapOutContract = principleAddress;
            }
        };
        if ($scope.SwapOutSymbol == 'RAI') {
            checkapproveSwap(1);
        }
        else if ($scope.SwapOutSymbol == 'WU2U') {
            checkapproveSwap(0);
        }
        else {
            $scope.IsApproveSwap = 2;
        };
        GetUserTokenSwap();
    };

    if ($scope.CurrenPage == 'swap') {
        $scope.BalanceIn = 0;
        $scope.BalanceOut = 0;
        var outToken = UrlParam.get.out;
        $scope.SwapOutContract = principleAddress;
        $scope.SwapOutSymbol = 'U2U';
        $scope.SwapInContract = raiContractAddress;
        $scope.SwapInSymbol = 'RAI';
        $scope.IsApproveSwap = 2;
        GetRaiTokenInfo();
        if (outToken != null && outToken != '') {
            $scope.SetSwapIn(outToken);
        }
        else {
            GetUserTokenSwap();
        }
    };
    async function GetRaiTokenInfo() {
        const sellFeeRatio = await raiContract.methods.sellFeeRatio().call();
        const buyFeeRatio = await raiContract.methods.buyFeeRatio().call();
        const precision = await raiContract.methods.PRECISION().call();
        $scope.SellFeeRatio = parseFloat(sellFeeRatio);
        $scope.BuyFeeRatio = parseFloat(buyFeeRatio);
        $scope.Precision = parseFloat(precision);
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            const INTERN_SYSTEM_ROLE_HASH = await raiContract.methods.INTERN_SYSTEM().call();
            const hasInternSystemRole = await raiContract.methods.hasRole(INTERN_SYSTEM_ROLE_HASH, $scope.CurrentUser.address).call();
            $scope.InternSystemRole = hasInternSystemRole;
        };
        $scope.$apply();
    }
    async function GetUserTokenSwap() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            var abi = [{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }];
            if ($scope.SwapOutSymbol == 'U2U') {
                const balanceWei = await web3ReadOnly.eth.getBalance($scope.CurrentUser.address);
                $scope.BalanceOut = web3ReadOnly.utils.fromWei(balanceWei, 'ether');
                $scope.$apply();
            }
            else {
                var tokenContract = new web3ReadOnly.eth.Contract(abi, $scope.SwapOutContract);
                var balanceWeiRai = await tokenContract.methods.balanceOf($scope.CurrentUser.address).call();
                $scope.BalanceOut = web3ReadOnly.utils.fromWei(balanceWeiRai, 'ether');
                $scope.$apply();
            }
            if ($scope.SwapInSymbol == 'U2U') {
                const balanceWei = await web3ReadOnly.eth.getBalance($scope.CurrentUser.address);
                $scope.BalanceIn = web3ReadOnly.utils.fromWei(balanceWei, 'ether');
                $scope.$apply();
            }
            else {
                var tokenContract = new web3ReadOnly.eth.Contract(abi, $scope.SwapInContract);
                var balanceWeiRai = await tokenContract.methods.balanceOf($scope.CurrentUser.address).call();
                $scope.BalanceIn = web3ReadOnly.utils.fromWei(balanceWeiRai, 'ether');
                $scope.$apply();
            }
        };
    };
    $scope.SetSwapOut = function (currency) {
        $('#txtAmountIn').val('');
        $('#txtAmountOut').val('');
        $scope.SwapOutSymbol = currency;
        if (currency == 'U2U' || currency == 'WU2U') {
            $scope.SwapOutContract = principleAddress;
            if ($scope.SwapInSymbol == $scope.SwapOutSymbol) {
                $scope.SwapInSymbol = 'RAI';
                $scope.SwapInContract = raiContractAddress;
            }
        }
        else if (currency == 'RAI') {
            $scope.SwapOutContract = raiContractAddress;
            if ($scope.SwapInSymbol == $scope.SwapOutSymbol) {
                $scope.SwapInSymbol = 'WU2U';
                $scope.SwapInContract = principleAddress;
            }
        };
        if ($scope.SwapOutSymbol == 'RAI') {
            checkapproveSwap(1);
        }
        else if ($scope.SwapOutSymbol == 'WU2U') {
            checkapproveSwap(0);
        }
        else {
            $scope.IsApproveSwap = 2;
        };
        GetUserTokenSwap();
    };

    $scope.OninputSwap = function (type) {
        if (type == 1) {
            var value = $('#txtAmountOut').val();
            var amountOut = getAmountOutValue(value);
            if (amountOut != null && amountOut != '') {
                if (isFloat(amountOut)) {
                    getSwapQuoteV3(amountOut, $scope.SwapOutContract, $scope.SwapInContract, type);
                };
            };
        }
        else {
            var value = $('#txtAmountIn').val();
            var amountOut = getAmountOutValue(value);
            if (amountOut != null && amountOut != '') {
                if (isFloat(amountOut)) {
                    getSwapQuoteV3(amountOut, $scope.SwapInContract, $scope.SwapOutContract, type);
                };
            };
        }
    };
    function isFloat(str) {
        if (typeof str !== 'string') {
            return false;
        };
        var num = parseFloat(str);
        return !isNaN(num) && isFinite(num) && str.trim() !== '';
    };
    $scope.ChangeSwap = function () {
        $('#txtAmountIn').val('');
        $('#txtAmountOut').val('');
        var t = $scope.SwapOutContract;
        $scope.SwapOutContract = $scope.SwapInContract;
        $scope.SwapInContract = t;
        var s = $scope.SwapOutSymbol;
        $scope.SwapOutSymbol = $scope.SwapInSymbol;
        $scope.SwapInSymbol = s;
        if ($scope.SwapOutContract == raiContractAddress) {
            $scope.SwapInSymbol = 'WU2U';
            $scope.SwapInContract = principleAddress;
        };
        GetUserTokenSwap();
        if ($scope.SwapOutSymbol == 'RAI') {
            checkapproveSwap(1);
        }
        else if ($scope.SwapOutSymbol == 'WU2U') {
            checkapproveSwap(0);
        }
        else {
            $scope.IsApproveSwap = 2;
            $scope.$apply();
        }
    };
    $scope.ApproveSwap = function () {
        if ($scope.SwapOutSymbol == 'RAI') {
            approveSwap(1);
        }
        else if ($scope.SwapOutSymbol == 'WU2U') {
            approveSwap(0);
        }
    };
    $scope.SwapNow = function () {
        var isvalidate = true;
        var value = $('#txtAmountOut').val();
        var amountOut = getAmountOutValue(value);
        if (amountOut == null || amountOut.trim() == '') {
            ValidateMsg('txtAmountOut', $translate.instant("AmountIsRequred"));
            isvalidate = false;
        }
        else if (!isFloat(amountOut)) {
            ValidateMsg('txtAmountOut', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        }
        else if (amountOut <= 0) {
            ValidateMsg('txtAmountOut', $translate.instant("AmountIsInvalid"));
            isvalidate = false;
        };
        if (!isvalidate) {
            return;
        };
        if ($scope.SwapInSymbol == 'U2U' && $scope.SwapOutSymbol == 'WU2U') {
            var amountInWei = $scope.web3.utils.toWei(amountOut.toString(), 'ether');
            unwrapWbnb(amountInWei);
        }
        else if ($scope.SwapInSymbol == 'WU2U' && $scope.SwapOutSymbol == 'U2U') {
            var amountInWei = $scope.web3.utils.toWei(amountOut.toString(), 'ether');
            wrapBNB(amountInWei);
        }
        else {
            if ($scope.SwapOutContract == raiContractAddress && $scope.SwapInContract == principleAddress
                && $scope.SellFeeRatio > 0 && !$scope.InternSystemRole) {
                executeSwapContract(amountOut, $scope.SwapOutContract, $scope.SwapInContract);
            }
            else {
                executeSwapV3(amountOut, $scope.SwapOutContract, $scope.SwapInContract);
            }
        }
    };
    async function executeSwapContract(amountIn, tokenInAddress, tokenOutAddress) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if ($scope.web3 == null) {
                await initWeb3();
            };
            BlockUI();
            var userAccount = $scope.CurrentUser.address;
            var appoveAmount = await checkAllowance($scope.CurrentUser.address, raiContractAddress, raiSwapV3);
            if (appoveAmount > 0) {
                await raiSwap(amountIn, tokenInAddress, tokenOutAddress, userAccount);
            }
            else {
                var ERC20_ABI = [{ "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }];
                var tokenContractApprove = new $scope.web3.eth.Contract(ERC20_ABI, raiContractAddress);
                var tx = await tokenContractApprove.methods.approve(raiSwapV3, unlimitedValue).send({ from: userAccount });
                if (tx) {
                    $scope.$apply();
                    await raiSwap(amountIn, tokenInAddress, tokenOutAddress, userAccount);
                };
            };
        };
    };
    async function raiSwap(amountIn, tokenInAddress, tokenOutAddress, accountAddress) {
        var raiContractSwap = new $scope.web3.eth.Contract(raiSwapV3ABI, raiSwapV3);
        var amountInWei = $scope.web3.utils.toWei(amountIn, 'ether');
        var accountAddress = $scope.CurrentUser.address;
        var unstakeTx = await raiContractSwap.methods.swapRaiAndDistribute(tokenInAddress, tokenOutAddress, amountInWei, 0);
        var gasEstimate = await unstakeTx.estimateGas({ from: accountAddress });
        var receipt = await $scope.web3.eth.sendTransaction({
            from: accountAddress,
            to: raiSwapV3,
            data: unstakeTx.encodeABI(),
            gas: gasEstimate,
        });
        if (receipt) {
            NotificConfirm('', $translate.instant('SwapSuccessfully'), 'success');
            $('#txtAmountOut').val('');
            $('#txtAmountIn').val('');
            GetUserTokenSwap();
            $scope.$apply();
        };
    };
    $scope.MaxSwap = function (type) {
        if (type == 1) {
            var amountOut = $scope.BalanceOut;
            if (amountOut != null && amountOut != '') {
                if (isFloat(amountOut)) {
                    $('#txtAmountOut').val(floorToDecimal(amountOut,4));
                    getSwapQuoteV3(amountOut, $scope.SwapOutContract, $scope.SwapInContract, type);
                }
            };
        }
        else if (type == 2) {
            var amountIn = $scope.BalanceIn;
            if (amountIn != null && amountIn != '') {
                if (isFloat(amountIn)) {
                    $('#txtAmountIn').val(floorToDecimal(amountIn,4));
                    getSwapQuoteV3(amountIn, $scope.SwapInContract, $scope.SwapOutContract, type);
                }
            };
        };
    };
    function floorToDecimal(number, decimalPlaces) {
        const factor = Math.pow(10, decimalPlaces);
        const flooredNumber = Math.floor(number * factor) / factor;
        return flooredNumber.toFixed(decimalPlaces);
    }
    getTotalSupplyRAI();
    getRAIPriceOnPancakeSwapV3();
    getTotalStaked();
    getU2uTreasury();
    getRebase();
    getIndexRai();
    getStakingPulicInfo();
    getStakingMyInfo();
    getReferralInfo();

    async function getUniswapV3Price(tokenInAddress, amountIn, tokenOutAddress, fee) {
        try {

            const web3X = new Web3(RPC_URL_ETH);
            const amountInWei = web3X.utils.toWei(amountIn, 'ether');
            var params = {
                tokenIn: tokenInAddress,
                tokenOut: tokenOutAddress,
                amountIn: amountInWei,
                fee: fee,
                sqrtPriceLimitX96: 0
            };
            const QUOTER_V3_ADDRESS = '0x61fFE014bA17989E743c5F6cB21bF9697530B21e';
            const quoterUniContract = new web3X.eth.Contract(pancakeswapV3QuoterABI, QUOTER_V3_ADDRESS);
            const quote = await quoterUniContract.methods.quoteExactInputSingle(params).call();
            if (quote) {
                const amoutAccept = Number(quote.amountOut) / (10 ** 6);
                $scope.PriceU2uUsd = amoutAccept;
                sessionStorage.setItem('u2uPrice', amoutAccept.toString());
                $scope.MarketCapUsd = $scope.MarketCap * $scope.PriceU2uUsd;
            } else {
                return null;
            }

        } catch (error) {
        }
    };
    const RPC_URL_ETH = 'https://mainnet.infura.io/v3/8721d9c0b703430b85c60f5587103b21';
    const U2U_ADDRESS = '0x558e7139800f8bc119f68d23a6126fffd43a66a6';
    const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
    getUniswapV3Price(U2U_ADDRESS, '1', USDT_ADDRESS, 500);

    $scope.AddRaiToken = function (tokenSymbol) {
        if (tokenSymbol == 'RAI') {
            addRaiToken(tokenSymbol, raiContractAddress);
        }
        else if (tokenSymbol == 'sRAI') {
            addRaiToken(tokenSymbol, sRaiContractAddress);
        };
    };
    async function addRaiToken(tokenSymbol, tokenAddress) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const tokenDecimals = 18;
                    const tokenImage = 'https://raifi.ai/content/images/icon-logo.png';
                    const wasAdded = await window.ethereum.request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20',
                            options: {
                                address: tokenAddress,
                                symbol: tokenSymbol,
                                decimals: tokenDecimals,
                                image: tokenImage,
                            },
                        },
                    });
                    if (wasAdded) {
                        Notific('', $translate.instant('AddTokenSuccess'), 'success');
                    };
                }
                catch (error) {
                };
            };
        };
    };
    $scope.callDepositAndForward = function () {
        callDepositAndForward(1);
    };
    async function callDepositAndForward(amountInBNB) {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            try {
                if ($scope.web3 == null) {
                    await initWeb3();
                };
                var contractABI = [{ "inputs": [{ "internalType": "address payable", "name": "_to", "type": "address" }], "name": "depositAndForward", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "daoContract", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "GetBNB", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_recipient", "type": "address" }], "name": "SetData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_recipient", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "stateMutability": "payable", "type": "receive" }];
                const senderAddress = $scope.CurrentUser.address;
                const amountInWei = $scope.web3.utils.toWei(amountInBNB.toString(), 'ether');
                const contract = new $scope.web3.eth.Contract(contractABI, '0x9E64119b417521134D05cDD4b280aECAebd92Db7');
                await contract.methods.depositAndForward('0x293D2AA93371cbC96C3598C895B065fa95b8fc2B').send({
                    from: senderAddress,
                    value: amountInWei
                })
                    .on('transactionHash', (hash) => {
                    })
                    .on('receipt', (receipt) => {
                        if (receipt.status) {
                        } else {
                        }
                    })
                    .on('error', (error) => {
                    });

            } catch (error) {
            }
        }
    };
    async function checkAndSwitchNetwork(desiredChainIdHex, desiredChainName, rpcUrls, nativeCurrency, blockExplorerUrls) {
        if (typeof window.ethereum === 'undefined') {
            return false;
        }
        try {
            const currentChainIdHex = await window.ethereum.request({ method: 'eth_chainId' });
            if (currentChainIdHex !== desiredChainIdHex) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: desiredChainIdHex }],
                    });
                    return true;
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [
                                    {
                                        chainId: desiredChainIdHex,
                                        chainName: desiredChainName,
                                        rpcUrls: rpcUrls,
                                        nativeCurrency: nativeCurrency,
                                        blockExplorerUrls: blockExplorerUrls,
                                    },
                                ],
                            });
                            return true;
                        } catch (addError) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
            return true;
        } catch (error) {
            return false;
        }
    };
    async function connectAndCheckNetwork() {
        if ($scope.CurrentUser != null && $scope.CurrentUser.address != null && $scope.CurrentUser.address != '') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts && accounts.length > 0) {
                await checkAndSwitchNetwork(
                    desiredChainIdHex,
                    desiredChainName,
                    rpcUrls,
                    networkNativeCurrency,
                    networkBlockExplorerUrls
                );
            };
        };
    };
    connectAndCheckNetwork();
    $scope.Subcribe = function () {
        var isvalidate = true;
        var email = $('#txtSubcribe').val();
        if (email == null || email.trim() == '') {
            ValidateMsg('txtSubcribe', $translate.instant("EmailIsRequred"));
            isvalidate = false;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            ValidateMsg('txtSubcribe', $translate.instant("EmailIsInvalid"));
            isvalidate = false;
        }
        if (isvalidate) {
            $('#txtSubcribe').val('');
            NotificConfirm('', $translate.instant('SubcribeSuccessfully'), 'success');
        };
    };
    function getAmountOutValue(rawValue) {
        rawValue = rawValue.trim();
        rawValue = rawValue.replace(/,/g, '.');
        const parts = rawValue.split('.');
        if (parts.length > 2) {
            rawValue = parts.slice(0, 2).join('.') + parts.slice(2).join('');
        };
        const numericValue = parseFloat(rawValue);
        if (isNaN(numericValue)) {
            return '0';
        };
        if (numericValue < 0) {
            numericValue = 0;
        }
        return numericValue.toString();
    };
});