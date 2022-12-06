const { network, ethers } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const FUND_AMOUNT = ethers.utils.parseEther("1")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId

    let vrfCoordinatorV2Address, subscriptionId, vrfCoordinatorV2Mock
    if (chainId == 31337) {
        try {
            vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
            vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
            const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
            const transactionReceipt = await transactionResponse.wait()
            subscriptionId = transactionReceipt.events[0].args.subId
            await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, FUND_AMOUNT)
        } catch (e) {
            console.log(vrfCoordinatorV2Mock)
        }
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    const config = networkConfig[chainId]
    const arguments = [
        vrfCoordinatorV2Address,
        subscriptionId,
        config["gasLane"],
        config["keepersUpdateInterval"],
        config["raffleEntranceFee"],
        config["callbackGasLimit"],
    ]
    const lottery = await deploy("Lottery", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log(" Lottery contract begains to deploy---------")
    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        await vrfCoordinatorV2Mock.addConsumer(subscriptionId, lottery.address)
    }
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying-------------")
        await verify(lottery.address, arguments)
    }
    const networkName = network.name === "hardhat" ? "localhost" : network.name
    log(`yarn hardhat run scripts/enter.js --network ${networkName}`)

    log(`Lottery has deployed on  network: ${networkName} successfully------------`)
}
module.exports.tags = ["all", "lottery"]
// module.exports = async () => {}
