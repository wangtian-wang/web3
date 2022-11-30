// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract testPay{
    uint256 transactionCount;
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;
    function addToBlockChain(address payable receiver, unit amount, string memory message,string memory keyword) public {
        transactionCount += 1;
        // msg.sender   发送者
        // block.timestamp  区块链上的时间     好像一个全局变量.在代码运行的时候,被注入到脚本中
        transactions.push(TransferStruct(msg.sender, receiver,amount,message,block.timestamp, keyword));
        emit Transfer(msg.sender, receiver,amount,message,block.timestamp, keyword)
    }
    function getAllTransactions() public view returns (TransferStruct[] memory){
        // return transactions
    }
    function getAllTransactionCount() public view returns (uint256 ) {
        // return transactionCount
    }
}