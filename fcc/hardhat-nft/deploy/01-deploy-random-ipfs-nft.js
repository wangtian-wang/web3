require("dotenv").config()
const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const Fund_AMOUNT = "1000000000000000000000"
const imageLocation = "./images/"
let tokenUris = [
    "ipfs://QmTyJNpfNj4gcCu8wGXS2KGUujVF721ydpYkTG2Tc6q3jH",
    "ipfs://QmbrLBcmjWJeCzWxAGmy1eBGgQtMhguEmvjgNLdkkfVGPi",
    "ipfs://QmfXPvE51G6iBTqhCWLMcqKwhVvHppvXRnTM1PKwPGKcTp",
]
const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [{ trait_type: "Cuteness", value: 100 }],
}

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let vrfCoordinatorV2Address, subscriptionId, vrfCoordinatorV2Mock
    if (process.env.UPLOAD_TO_PINATA === "true") {
        tokenUris = await handleTokenUris()
    }
    if (chainId == 31337) {
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
        const transactionReceipt = await transactionResponse.wait()
        subscriptionId = transactionReceipt.events[0].args.subId
        await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, Fund_AMOUNT)
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }
    log("-------------------------------------------------------")
    const argumentsArr = [
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId]["gasLane"],
        networkConfig[chainId]["mintFee"],
        networkConfig[chainId]["callbackGasLimit"],
        tokenUris,
    ]
    const randomIpfsNft = await deploy("RandomIpfsNft", {
        from: deployer,
        args: argumentsArr,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (chainId == 31337) {
        await vrfCoordinatorV2Mock.addConsumer(subscriptionId, randomIpfsNft.address)
    }
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying.............")
        await verify(randomIpfsNft.address, argumentsArr)
    }
}
async function handleTokenUris() {
    let tokenUris = []
    const { response: imageUploadResponse, files } = await storeImages(imageLocation)
    console.log(imageUploadResponse, "imageUploadResponse--")
    for (let index in imageUploadResponse) {
        let tokenUrisMetedata = { ...metadataTemplate }
        tokenUrisMetedata.name = files[index].replace(".png", "")
        tokenUrisMetedata.description = `An adorable ${tokenUrisMetedata.name} pup~~`
        tokenUrisMetedata.image = `ipfs://${imageUploadResponse[index].IpfsHash}`
        console.log(`uploading ${tokenUrisMetedata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUrisMetedata)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIS UPLOADED! They are:")
    console.log(tokenUris)
    return tokenUris
}
module.exports.tags = ["all", "randomipfs", "main"]
