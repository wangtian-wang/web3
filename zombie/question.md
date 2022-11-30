#### 怎样的合约应该由 abstract 修饰

#### msg.sender owner 等 分别有啥方法呢

#### web3.js 与前端的交互

#### `Hybird Smart Contracts`

- framework chainlink
- it also called 有链下组件的智能合约

#### 只能合约平台是啥?

#### web3

- 以智能合约和区块链为基础的下一代网络

### 应用

- DEFI
- DAO
- NFT
- 无聊猿

### 测试网与主网

- 测试网有对应的测试网址 来查看当前的交易 比如我的测试网络是 goerli 我在https://goerli.etherscan.io
  这个网站上 能查到自己的交易记录
- 主网上也有主网专门用来查询交易记录的网站 https://etherscan.io/address/
- 每个测试网站 上使用的测试币 必须去对应的测试网水龙头上领测试币 faucets.chain.link 可以领取测试币
- link token contracts 最新的领取测试币的网址

### gas

- gas 费用由在以太坊上运行的合约的复杂度(运算的复杂度)决定
- 每种区块链都有自己的 gas 计算规则

#### 区块链的交易需要签名,签名是怎样发生的呢?

- 在 metamask 上面可以用登录密码自动生成签名
- 前端项目里面需要使用这个签名来与其他的合约交互

#### 合约内部部署另外一个合约

```solidity

  import "./children.sol";
  contract Father {
    Children public children;
    function createChildren () public {
        children = new Children();
    }
  }

```

#### msg.sender 代表给你转账的人

#### msg.value 代表别人给你转账的以太币的数量

#### 单位的换算

#### payable 定义的函数是红色标识吗? 转账的过程

#### receive fallback 的声明方式

#### 提问社区 stackechange
