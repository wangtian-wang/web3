####  wallets

- What 

  - 管理公钥 私钥,加密签署交易,并证明以太坊网络上的所有权.

- function

  -  new wallet -> get an instance 

    - Instance methods
      - `address` 钱包的公钥地址
      - `privateKey`  钱包的私钥
      - `getAddress`  获取地址 对于Wallet ,只能返回一个简单的 address 属性
      - provider  返回一个连接的提供者，它允许钱包连接到以太坊网络，查询其状态并发送交易
      - `sign` 对事务(交易)进行签名并以十六进制字符串的形式返回签名的事务。
      - signMessage  对信息进行签名并以十六进制字符串的形式返回签名的事务。
      - `encrypt` 返回一个promise，并将钱包加密为秘密存储JSON钱包

    

    

- `Blockchain operations`  属于实例方法 返回值为promise

  - getBalance 返回钱包的余额
  - getTransactionCount  返回这个账户曾经交易的数量
  - `estimateGas` 返回交易的估值花费
  - `sendTransaction `  发送交易,一个promise对象 带有交易的详情
  - `send` 发送 amountWei 到指定的地址

  #### Wallet methods

  -  `parseTransaction` 解析**hexStringOrArrayish** 为Transition
  - `createRandom`  创建一个随机钱包
  - `fromEncryptedWallet`   解密一个加密的秘密存储JSON钱包
  - `verifyMessage`  返回一个被signature签名后的message的地址

  

## provider

###### function

- 抽象了一个区块链的连接,用于发送状态改变事务和问题查询

###### methods

###### instance