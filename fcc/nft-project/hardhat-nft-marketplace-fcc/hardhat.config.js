require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const GOERLI_RPC_URL =
  process.env.GOERLI_PRC_URL || "https://eth-goerli.alchemyapi.io/v2/";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const REPORT_GAS = process.env.REPORT_GAS;
const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/";
module.exports = {
  defaultNetWork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  contractSizer: {
    runOnCompile: false,
    only: ["NftMarketplace"],
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
    player: {
      default: 1,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.7" }, { version: "0.4.24" }],
  },
  mocha: {
    timeout: 2000000,
  },
};
