const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-block");
const TOKEN_ID = 1;
async function buyItem() {
  const NftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNft");
  const listing = await NftMarketplace.getListing(basicNft.address, TOKEN_ID);
  const price = listing.price.toString();
  const tx = await NftMarketplace.butItem(basicNft.address, TOKEN_ID, {
    value: price,
  });
  await tx.wait(1);
  console.log("NFT Bought!");
  if (network.config.chainId == "31337") {
    await moveBlocks(2, 1000);
  }
}
buyItem()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit();
  });
