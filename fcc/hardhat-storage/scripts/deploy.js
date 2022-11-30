const { network, ethers, run } = require("hardhat");
const hardhat = require("hardhat");

async function main() {
  const storageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract...");
  const simpleStorage = await storageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`deploying contract to: ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.VERIFY_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  // 合约部署成功 开始与合约交互

  const currentValue = await simpleStorage.retrieve();
  console.log(`currentValue is : ${currentValue}`);

  // update
  const transitionResponse = await simpleStorage.store(9);
  await transitionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`updatedValue is : ${updatedValue}`);
}
async function verify(constarctAddress, args) {
  try {
    await run("verify:verify", {
      address: constarctAddress,
      constructorArguments: args,
    });
    console.log("verified contract!!!");
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified.");
    } else {
      console.error(e);
    }
  }
}

main()
  .then(() => {
    console.log("contract deployed success...");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
