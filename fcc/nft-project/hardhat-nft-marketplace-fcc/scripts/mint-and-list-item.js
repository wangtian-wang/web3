const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-block");
const PRICE = ethers.utils.parseEther("0.1");
async function mintAndList() {
  const NftMarketplace = ethers.getContract("NftMarketplace");
  const randomNumber = Math.floor(Math.random() * 2);
  let basicNft;
  if (randomNumber == 1) {
    basicNft = await ethers.getContract("BasicNftTwo");
  } else {
    basicNft = await ethers.getContract("BasicNft");
  }
  console.log("Minting NFT");
  const mintTx = await basicNft.mintNft();
  const mintTxReceipt = await mintTx().wait(1);
  const tokenId = mintTxReceipt.events[0].args.tokenId;
  console.log("Approving NFT");
  const approvalTx = await basicNft.approve(NftMarketplace.address, tokenId);
  await approvalTx.wait(1);
  console.log("Listing NFT");
  const tx = await NftMarketplace.listItem(basicNft.address, tokenId, PRICE);
  await tx.wait(1);
  console.log("NFT Listed");
  if (network.config.chainId == "31337") {
    await moveBlocks(1, 1000);
  }
}
mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
