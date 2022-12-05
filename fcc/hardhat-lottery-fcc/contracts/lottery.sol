// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";
import "hardhat/console.sol";

/** errors */
error L_UpkeepNotNeed(uint256 currentBalance, uint256 numPlayers, uint256 LotteryState);
error L_TransferFailed();
error L_SenderMoreToLottery();
error L_LotteryNotOpen();

abstract contract Lottery is VRFConsumerBaseV2, AutomationCompatibleInterface {
    enum LotteryState {
        OPEN,
        CALCULATING
    }
    /** variables  of chainlink VRF*/
    VRFCoordinatorV2Interface private immutable l_coordinatorVrf;
    uint64 private immutable l_subscriptionId;
    bytes32 private immutable l_gasLane;
    uint32 private immutable l_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;

    /** variables  of chainlink lottery*/
    uint256 private immutable l_interval;
    uint256 private immutable l_entranceFee;
    uint256 private s_lastTimeStamp;
    address private s_rencentWinner;
    address payable[] private s_players;
    LotteryState private l_lotteryState;

    /** events*/
    event RequestedLotteryWinner(uint256 indexed requestid);
    event LotteryEnter(address indexed player);
    event WinnerPicked(address indexed player);

    constructor(
        address coordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane,
        uint256 intervel,
        uint256 entranceFee,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(coordinatorV2) {
        l_coordinatorVrf = VRFCoordinatorV2Interface(coordinatorV2);
        l_gasLane = gasLane;
        l_interval = intervel;
        l_subscriptionId = subscriptionId;
        l_entranceFee = entranceFee;
        s_lastTimeStamp = block.timestamp;
        l_lotteryState = LotteryState.OPEN;
        l_callbackGasLimit = callbackGasLimit;
    }

    function enterLottery() public payable {
        if (msg.value < l_entranceFee) {
            revert L_SenderMoreToLottery();
        }
        if (l_lotteryState != LotteryState.OPEN) {
            revert L_LotteryNotOpen();
        }
        s_players.push(payable(msg.sender)); // todo payable是进行转换吗?
        emit LotteryEnter(msg.sender);
    }

    function checkUpKeep(
        bytes memory /* checkData */
    )
        public
        view
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        bool isOpen = LotteryState.OPEN == l_lotteryState;
        bool timePassed = ((block.timestamp - s_lastTimeStamp) > l_interval);
        bool hasPlayer = s_players.length > 0;
        bool hasBalance = address(this).balance > 0;
        upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayer);
        return (upkeepNeeded, "0x0");
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpKeep("");
        if (!upkeepNeeded) {
            revert L_UpkeepNotNeed(
                address(this).balance,
                s_players.length,
                uint256(l_lotteryState)
            );
        }
        l_lotteryState = LotteryState.CALCULATING;
        uint256 requestId = l_coordinatorVrf.requestRandomWords(
            l_gasLane,
            l_subscriptionId,
            REQUEST_CONFIRMATIONS,
            l_callbackGasLimit,
            NUM_WORDS
        );
        emit RequestedLotteryWinner(requestId);
    }

    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
        uint256 indexofWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexofWinner];
        s_rencentWinner = recentWinner;
        /** reset some variables */
        s_players = new address payable[](0);
        l_lotteryState = LotteryState.OPEN;
        s_lastTimeStamp = block.timestamp;
        (bool success, ) = recentWinner.call{value: address(this).balance}("");
        if (!success) {
            revert L_TransferFailed();
        }
        emit WinnerPicked(recentWinner);
    }

    /** Getter Functions */

    function getRaffleState() public view returns (LotteryState) {
        return l_lotteryState;
    }

    function getNumWords() public pure returns (uint256) {
        return NUM_WORDS;
    }

    function getRequestConfirmations() public pure returns (uint256) {
        return REQUEST_CONFIRMATIONS;
    }

    function getRecentWinner() public view returns (address) {
        return s_rencentWinner;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getInterval() public view returns (uint256) {
        return l_interval;
    }

    function getEntranceFee() public view returns (uint256) {
        return l_entranceFee;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }
}
