// function deployFundMe () {
//     console.log('deploy a contract!!!')
// }
// module.exports.default = deployFundMe
// 部署的函数 必须挂载到exports对象的default属性上,既默认只导出为一个函数

const { network,ethers } = require('hardhat');
const { networkConfig, developmentChains } = require('../helper-hardhat-config.js');
const { verify } = require("../utils/verify.js");
const Dotenv = require("dotenv");
const path = require("path")
Dotenv.config({
    path: path.resolve(__dirname, "./.env"),
    encoding: "utf-8",
    debug: false,
   }).parsed;
  
module.exports = async (hardhat:any) => {
    const { getNamedAccounts, deployments } = hardhat;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId; // 得到使用--network goerli 指定网络的id
    let ethUsdPriceFeedAddress;
    if (chainId === 31337) {
        console.log(deployments, '-------------------')

        // const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        // console.log(ethUsdAggregator, '-------------------')
        // ethUsdPriceFeedAddress = ethUsdAggregator.address;
        // console.log('address form local  MockV3Aggregator', ethUsdPriceFeedAddress);

    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed;
        console.log('address form other testnet', ethUsdPriceFeedAddress);
    }  
    // if (!ethUsdPriceFeedAddress) {
    //     console.log('----no --args----');
    //     process.exit(1)
    // }
    
    const fundme = await deploy('FundMe', {
        from: deployer,
        contract: 'FundMe',
        args: [ethUsdPriceFeedAddress],
        log: true,
        // waitConfirmations: network.config.blockConfirmations || 1
    })
    log(`FundMe deployed at address: ${fundme.address}`)
    // 如果不是部署在本地环境 就需要在ethersacn 上验证
    if (!developmentChains.includes(network.name) && process.env.VERIFY_KEY) {
        await verify(fundme.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"];