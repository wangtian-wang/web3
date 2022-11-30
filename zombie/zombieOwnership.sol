/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./zombieAttrack.sol";
import "./erc721.sol";
import "./safeMath.sol";

abstract contract ZombieOwnerShip is ZombieAttrack, ERC721 {
    using SafeMath for uint256;
    mapping (uint => address) zombieApprovals;
    ///  override 代表重新该函数
    function balanceOf(address _owner) public  override view returns (uint256 _balance) {
        return ownerZombieCount[_owner];
    }
    function ownerOf(uint _tokenId) public override view returns (address _owner) {
        return zombieToOwner[_tokenId];
    }
    function _transfer(address _from, address _to, uint256 _tokenId) private {
        ownerZombieCount[_to] = ownerZombieCount[_to].add(1);
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].sub(1);
        zombieToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

}