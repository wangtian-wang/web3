const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.depoly();
  await transactions.deployed();
  console.log(" Transactions deployed to: ", transactions.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
/**
 * 在部署前 需要拿到一些 以太币 在faucet.egorfine.com  上需要 一个账户 和地址
 * 部署地址
 * 部署文件
 * 部署命令  成功后 得到一个地址
 * 进入前端文件夹 src/utils 将以太坊钱包的地址 保存起来
 * 将以太坊的信息 提供给/注入到整个 前端的项目中  useContext() react.createContext()
 *
 */
