const { network } = require("hardhat");
const verify = require("../utils/verify");
const {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../hardhat-helper");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;
  const argus = [];
  const nftMarketPlace = await deploy("NftMarketplace", {
    from: deployer,
    args: argus,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("verify...");
    await verify(nftMarketPlace.address, argus);
  }
  log("NftMarketplace has deployed-------");
};
module.exports.tags = ["all", "nftmarketplace"];
