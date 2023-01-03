## 1: 储存在区块链上的数据只有 智能合约才能访问 .前端如何获取 存储在只能合约上的数据

what can access these data
off chain services can access these events
we will index the events off-chain and then read from our database
what events is off-chain events ?
what is our database?
how to implements these?

- first: setup a server to listen for those events to be fired
- second : add events to database to query
- third : call our centralized database to start
- moralis 带有可选的 back service provides a single workflow
- single workflow
  智能合约部署在区块链上 ,还需要有一个可以连接的智能合约的后端 可以监控只能合约的运行情况
  所有区块链上的计算 最终都需要 进入 backend
  前端只展示区块链上的数据,比如 转账 nft 的数量 ,前端展示的数据来源于 backend

所有的一切都以 moralis 身份开始
一份代码 可以在不同区块的用户,钱包中登录
所有的交易, 相关者, 都将从用户哪里同步
提供了 web session 保证登录安全 可以管理, 校验 session identity
用户可以实时直到发生了啥
cross-chain cross-platform
需要监听的事件都 需要新建一张数据库表

与 morality 交互需要

- 1 部署合约
- 2 连接 morality 的数据库
- 3 重启后 需要 点击 Reset localchain 的按钮

morality cloud function

- 监视合约的事件,一旦被监视的事件触发 云函数就会自动执行
- 本地上传函数成功后, 需要将 terminal 关闭 需要修改的时候 重新启动 可以清除服务器的内存
- 云函数在哪运行呢?

what does mint-and-list.js do ?? in hardhat-nft-marketplace-fcc??
是一个测试脚本,可以人工模拟和智能合约的互动

restart something will be weird in local dev environment

重启后 会发现 数据表中存在一些旧的数据 可以将该数据 手动删除
云函数是在 moralis 上执行的 所以 打印的日志也在 moralis 上

### utils 字符串截断

```js
const truncateStr = (str, strLen) => {
  // strLen 要保留多少位字符串
  if (str.length <= strLen) return str;
  const separator = "...";
  const separatorLen = separator.length;
  const charToShow = strLen - separatorLen;
  const frontChar = Math.ceil(charToShow / 2);
  const endChar = Math.floor(charToShow / 2);
  return (
    str.substring(0, frontChar) +
    separator +
    str.substring(str.length - endChar)
  );
};
```
