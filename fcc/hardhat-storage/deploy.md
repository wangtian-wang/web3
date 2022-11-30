### `yarn add hardhat`

- 初始化一个 hardhat project

### `yard add @nomiclabs/hardhat-ethers @nomiclabs/hardhat-waffle ethereum-waffle ethers --dev`

- 安装项目的依赖项

### `npx hardhat compile`

#### `npx === yarn `

- 编译

### `npx hardhat run scripts/deploy.js `

- 部署

#### 部署到那个网站上需要验证呢?

- 部署测试网(以太坊公认的网络)上面需要验证
- 在部署完成后 控制台会有一个合约部署地址 可以使用这个地址来查看合约部署进度

#### 如何自定义一个使用 `npx hardhat compile` 运行的 `compile`命令

- `tasks/block-id.js` 定义 task 的文件夹
- 使用`npx hardhat` 查看自定义的 task 名称
- `npx hardhat [task]`

#### 使用 node 开启本地网络

- `npx hardhat node`
- 之后可以在本地部署 配置一个本地的网络名为 localhost
- 部署合约使用本地网络

#### 命令行使用 console

- `npx hardhat console --network localhost`
- 使用 console 可以快速与合约交互 控制台立即执行输入的命令,就像 chrome 的开发者工具可以执行 JS 代码
