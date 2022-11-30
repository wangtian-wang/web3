const { task } = require("hardhat/config");
task("block-id", " print current block id").setAction(
  async (taskArgs, hardhat) => {
    const blockId = await hardhat.ethers.provider.getBlockNumber();
    console.log(`current block id is :${blockId}`);
  }
);
module.exports = {};
