#### 合约的作用是啥

#### 将静态的图片部署到网站后, 与合约的关系是啥

#### IPSF 的作用

#### pinata 的 url 需要将合约部署后,拿到地址 然后才能获取 url

#### 合约部署完成后 NFT 会被部署到线上 NFT 的收益方式 与合约的关系

#### 进度

-   已完成
    -   将图片保存到了 pnitata 上
    -   nft 的部署合同已经完成
    -   合约部署完成
-   未完成

    -   测试

-   待解决
-   what is pin data ?

#### ipfs

-   免费的文件托管平台 也可以将文件直接托管到某个区块链上面
-   缺点 需要至少一个人正确的 Pin you data, 文件硬币可以奖励人们 pin your data

#### 不同文件类型的 NFT 的优势比较

-   .png 类型的文件
    -   托管在 IPFS 上时
        -   pros: cheap
        -   cons: someone needs to pin our data
-   dynamic SVG 类型的文件
    -   pros: the data is on chain
    -   cons: much more expensive
    -   必须托管在链上吗?
-   问题 无论那种类型的文件应该都可以托管在链上或者 IPFS 上

#### 合约的内容

-   Nonce: tx count for the account
    -Gas price: price per unit of gas
-   Gas limit : max gas that this tx can use
-   To: empty
-   Value: amount of wei to send
-   Data: contract init code and contract bytecode
    合约是部署在某个地址上面 to: address,初始化时 empty
    每次进行一个交易的时候 就是 create 一个合约
    evm 是根据合约的 data 来明白这个合约的功能
    在以太坊上存储的数据只要体积小 就可以节省 gas 费用 比如使用 abi.encodePacked() | bytes()

#### 合约事件的定义 和调用 规范

#### 错误事件的工作流程
