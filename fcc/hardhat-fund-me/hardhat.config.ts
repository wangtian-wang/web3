import { HardhatUserConfig } from "hardhat/config";
require("@nomiclabs/hardhat-etherscan");// verfify 必须引入
import "@nomiclabs/hardhat-waffle"
import "hardhat-deploy";
const Dotenv = require("dotenv");
const path = require("path");

 Dotenv.config({
  path: path.resolve(__dirname, "./.env"),
  encoding: "utf-8",
  debug: false,
 }).parsed;



const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const ACCOUNT = (process.env.ACCOUNT) as string;
const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    solidity: {
        compilers: [
            { version: "0.8.17" },
            { version: "0.6.6" }
       ] 
    },
    networks: {
        hardhat: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [ACCOUNT],
            chainId: 5,
            // blockConfirmations: 6,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // 当指定部署到那个网络的时候, 会选取默认的accounts中的对应的账户
        }
    },
    etherscan: {
        apiKey: {
            goerli:( process.env.VERIFY_KEY) as string
        },
        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                  apiURL: "https://api-goerli.etherscan.io/api",
                  browserURL: "https://goerli.etherscan.io"
                }
              }
        ]
    }
};

export default config;
