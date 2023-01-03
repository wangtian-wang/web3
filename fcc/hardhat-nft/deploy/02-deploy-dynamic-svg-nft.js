const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const fs = require("fs")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let EthUsdPriceFeedAddress
    if (chainId == 31337) {
        const EthUsdAggregator = await deployments.get("MockV3Aggregator")
        EthUsdPriceFeedAddress = EthUsdAggregator.address
    } else {
        EthUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed
    }
    const lowSVG = fs.readFileSync("./images/dynamic/frown.svg", { encoding: "utf8" })
    const highSVG = fs.readFileSync("./images/dynamic/happy.svg", { encoding: "utf8" })
    log("began to deploy dynamic nft-----------------")
    const args = [EthUsdPriceFeedAddress, lowSVG, highSVG]
    const dynamicSvgNft = await deploy("DynamicSvgNft", {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    // verify
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(dynamicSvgNft.address.args, "dynamicNft")
    }
}
module.exports.tags = ["all", "dynamicsvg", "main"]
