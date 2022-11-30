/// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;
import "./zombieHelper.sol";
contract ZombieAttrack is ZombieHelper {
    uint randNonce = 0;
    uint attackVictoryProbaility = 70;
    function randMod (uint _modulus) internal returns(uint){
        randNonce++;
        return uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)))% _modulus;
    }
    function attack (uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
        Zombie storage myZombie = zombies[_zombieId];
        Zombie storage enemyZombie = zombies[_targetId];
        uint rand = randMod(100);
        if(rand <= attackVictoryProbaility){
            myZombie.winCount++;
            myZombie.level++;
            enemyZombie.lossCount++;
            feedMutiply(_zombieId, enemyZombie.dna, 'zombie');
        }else {
            myZombie.lossCount++;
        }
    }
}