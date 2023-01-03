console.log("update-frontend");
const {
  frontEndContractsFile,
  frontEndAbiLocation,
} = require("../hardhat-helper");
const fs = require("fs");
const { network, ethers } = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");
require("dotenv").config();
module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end");
    await updateContractAddress();
    await updateAbi();
    console.log("Front end written1");
  }
};
async function updateAbi() {
  const NftMarketplace = await ethers.getContract("NftMarketplace");
  fs.writeFileSync(
    `${frontEndAbiLocation}NftMarketplace.json`,
    NftMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );
}
async function updateContractAddress() {
  const chainId = network.config.chainId.toString();
  const NftMarketplace = await ethers.getContract("NftMarketplace");
  const contractAddress = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (chainId in contractAddress) {
    if (
      !contractAddress[chainId]["NftMarketplace"].includes(
        NftMarketplace.address
      )
    ) {
      contractAddress[chainId]["NftMarketplace"].push(NftMarketplace.address);
    }
  } else {
    contractAddress[chainId] = { NftMarketplace: [NftMarketplace.address] };
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddress));
}
module.exports.tags = ["all", "frontend"];
