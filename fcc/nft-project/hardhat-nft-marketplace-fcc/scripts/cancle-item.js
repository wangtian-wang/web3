const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-block");
const TOKEN_ID = 0;
async function cancel() {
  const NftMarketplace = await ethers.getContract("NftMarketplace");
  const basicNft = await ethers.getContract("BasicNft");
  const tx = await NftMarketplace.cancelListing(basicNft.address, TOKEN_ID);
  await tx.wait(1);
  console.log("NFT Canceled!");
  if (network.config.chainId == "31337") {
    await moveBlocks(2, 1000);
  }
}
cancel()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
