### `deploy`

- 使用社区的部署插件 需要在根目录下面建立一个 deploy 文件夹
- 然后执行 `npx hardhat deploy`

### 对于交易类型的智能合约 需要部署在区块链上 在本地的开发环境中 可以部署到一个模拟的区块链环境中

### 合约的测试

```js
----contracts
    -- test
        -- MockV3Aggregator.sol  这是部署的时候 使用的是本地网络时 需要部署这个文件 为啥需要部署这个文件呢
    -- FundMe.sol
```

- `npx hardhat deploy` 可以执行 deploy 下面的所有文件

### tag 的作用

- `module.exports.tags = ["all", "mocks"]`
-
