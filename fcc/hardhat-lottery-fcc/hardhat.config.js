require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
const path = require("path")
require("dotenv").config({
    path: path.resolve(__dirname, "./.env"),
    encoding: "utf-8",
    debug: false,
    override: false,
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const GOERLI_URL = process.env.GOERLI_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const MAINNET_URL = process.env.MAINNET_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const POLYGON_URL =
    process.env.POLYGON_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || ""
const REPORT_GAS = process.env.REPORT_GAS || ""
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 5,
        },
        mainnet: {
            url: MAINNET_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 1,
        },
        polygon: {
            url: POLYGON_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 137,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0,
        },
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            polygon: POLYGON_API_KEY,
        },
        // customChains: [
        //     {
        //         network: "goerli",
        //         chainId: 5,
        //         urls: {
        //             apiURL: "https://api-goerli.etherscan.io/api",
        //             browserURL: "https://goerli.etherscan.io",
        //         },
        //     },
        // ],
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.4.24",
            },
        ],
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Lottery"],
    },
}
