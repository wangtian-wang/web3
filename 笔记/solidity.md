####  Require(condition) 进行条件验证 条件不成立时 抛出错误

在 Solidity 中，有两个地方可以存储变量 —— `storage` 或 `memory`。

***Storage\*** 变量是指永久存储在区块链中的变量。 ***Memory\*** 变量则是临时的，当外部函数对某合约调用完成时，内存型变量即被移除。 你可以把它想象成存储在你电脑的硬盘或是RAM中数据的关系。

大多数时候你都用不到这些关键字，默认情况下 Solidity 会自动处理它们。 状态变量（在函数之外声明的变量）默认为“存储”形式，并永久写入区块链；而在函数内部声明的变量是“内存”型的，它们函数调用结束后消失。

然而也有一些情况下，你需要手动声明存储类型，主要用于处理函数内的 **_ 结构体 _** 和 **_ 数组 _** 时：

存储在区块链上的数据可以删除吗?

####  与其他的合约进行交互 interface

```solidity
contract LuckyNumber {
  mapping(address => uint) numbers;

  function setNum(uint _num) public {
    numbers[msg.sender] = _num;
  }

  function getNum(address _myAddress) public view returns (uint) {
    return numbers[_myAddress];
  }
}
```

```solidity
contract NumberInterface {
  function getNum(address _myAddress) public view  returns (uint);
}
```

函数的参数 返回值的类型完全相同 只是少了{}

合约的调用

```solidity
contract MyContract {
  address NumberInterfaceAddress = 0xab38...;
  NumberInterface numberContract = NumberInterface(NumberInterfaceAddress);
  // 现在变量 `numberContract` 指向另一个合约对象

  function someFunction() public {
    // 现在我们可以调用在那个合约中声明的 `getNum`函数:
    uint num = numberContract.getNum(msg.sender);
    // ...在这儿使用 `num`变量做些什么
  }
}
```

### 处理多返回值

```solidity
function multipleReturns() internal returns(uint a, uint b, uint c) {
  return (1, 2, 3);
}

function processMultipleReturns() external {
  uint a;
  uint b;
  uint c;
  // 这样来做批量赋值:
  (a, b, c) = multipleReturns();
}

// 或者如果我们只想返回其中一个变量:
function getLastReturnValue() external {
  uint c;
  // 可以对其他字段留空:
  (,,c) = multipleReturns();
}
```



