const { run } = require("hardhat");
const verify = async (contractAddress, args) => {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log("Verify failed,the reason is" + e);
    }
  }
};
module.exports = {
  verify,
};
