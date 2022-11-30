/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "./zombieFactory.sol";

abstract contract KittyInterface {
    function getKitty(uint256 _id) external view virtual returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

contract ZombieFeeding is ZombieFactory {
    KittyInterface kittyContract;
    modifier onlyOwnerOf(uint _zombieId) {
        require((msg.sender == zombieToOwner[_zombieId]));
        _;
    }
    function setKittyContractAddress( address _address) external onlyOwner{
        kittyContract = KittyInterface(_address);
    }
    function _triggerCooldown( Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(block.timestamp + cooldownTime);
    }
    function _isReady(Zombie storage _zombie) internal view returns(bool){
        return (_zombie.readyTime <= block.timestamp);
    }
    function feedMutiply(uint _zombieId, uint _targetDan, string memory _species) internal onlyOwnerOf(_zombieId){
        Zombie storage myZombie = zombies[_zombieId];
        require(_isReady(myZombie));
        _targetDan = _targetDan % dnaModulus;
        uint newDna = (myZombie.dna + _targetDan) / 2;
        if(keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))){
            newDna = newDna - newDna % 100 + 99;
        }
        _createZombies('NoName', newDna);
        _triggerCooldown(myZombie);
    }
    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
        string memory kitty = "kitty";
        feedMutiply(_zombieId, _kittyId, kitty);
    }
}