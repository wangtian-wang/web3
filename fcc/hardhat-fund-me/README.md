### `deploy`

-   使用社区的部署插件 需要在根目录下面建立一个 deploy 文件夹
-   然后执行 `npx hardhat deploy`

### 对于交易类型的智能合约 需要部署在区块链上 在本地的开发环境中 可以部署到一个模拟的区块链环境中

### 合约的测试

```js
----contracts
    -- test
        -- MockV3Aggregator.sol  这是部署的时候 使用的是本地网络时 需要部署这个文件 为啥需要部署这个文件呢
    -- FundMe.sol
```

-   `npx hardhat deploy` 可以执行 deploy 下面的所有文件

### tag 的作用

-   `module.exports.tags = ["all", "mocks"]`
-

### scripts 文件夹的作用

-   快速查看当前的部署文件有没有问题
-   执行 `npx hardhat node` 时 会执行 deploy 文件夹下面的内容
-   `npx hardhat deploy --network localhost` 将合约部署到本地
-   `hardhat run scripts/deploy.js --network localhost` 运行 deploy 脚本 将合约部署到本地
