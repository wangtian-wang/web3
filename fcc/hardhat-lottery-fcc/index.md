#### 为啥需要一个部署 mock 的脚本,还要在正式的部署脚本中 写上 mock 的部署测试脚本

#### 为啥需要部署`VRFCoordinatorV2Mock`合约呢? 该合约和正式合约的关系那个需要先部署

#### 本地的 mock 部署成功

#### `deployments.fixture('all')`

-   每个部署的脚本里面都有 `module.exports.tags= ['all', 'mock']`这样的代码
-   fixture 的参数 `'all'`会找到 `tags` 带有` all` 的部署脚本,之后部署合约

#### 测试 之前先要部署合约 测试的合约部署方式 和 部署脚本部署的方式不一样

#### 使用 deploy 插件 自动部署脚本 需要将 deploy 文件夹下面的文件按照 00-这样的模式命名. 按照顺序部署合约

#### abstract 修饰的合约编译后没有字节码 运行会报错 `checkUpkeep` `performUpkeep` 是 chainlink 的 vrf 固定的写法

#### 合约的测试脚本

-   当合约部署成功后 合约的测试脚本不会抛出合约部署之类的错误
