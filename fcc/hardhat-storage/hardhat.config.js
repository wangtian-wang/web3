require("@nomiclabs/hardhat-waffle"); // 这个是必须的
require("@nomiclabs/hardhat-etherscan"); // verfiy contract
require("./tasks/block-id");
const path = require("path");
const Dotenv = require("dotenv");
Dotenv.config({
  path: path.resolve(__dirname, "./.env"),
  encoding: "utf-8",
  debug: false,
}).parsed;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.ACCOUNTS], // 账户是私钥
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: process.env.VERIFY_KEY,
  },
};
