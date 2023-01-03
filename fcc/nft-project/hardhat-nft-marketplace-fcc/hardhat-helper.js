const networkConfig = {
  default: {
    name: "hardhat",
    keepersUpdateInterval: "30",
  },
  31337: {
    name: "localhost",
    subscriptionId: "588",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    keepersUpdateInterval: "30",
    raffleEntranceFee: "100000000000000000",
    callbackGasLimit: "500000",
  },
  5: {
    name: "goerli",
    subscriptionId: "588",
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    keepersUpdateInterval: "30",
    raffleEntranceFee: "100000000000000000",
    callbackGasLimit: "500000",
  },
  1: {
    name: "mainnet",
    keepersUpdateInterval: "30",
  },
};
const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
const frontEndContractsFile =
  "../nextjs-nft-marketplace-fcc/constants/networkMapping.json";
const frontEndAbiLocation = "../nextjs-nft-marketplace-fcc/constants/";
// const frontEndAbiLocation2 = '../nextjs-nft-marketplace-fcc/constants/'
module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
  frontEndAbiLocation,
  frontEndContractsFile,
};