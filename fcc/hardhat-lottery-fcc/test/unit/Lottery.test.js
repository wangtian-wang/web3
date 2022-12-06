const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lottery unit test", function () {
          let lottery,
              lotteryContract,
              vrfCoordinatorV2Mock,
              lotteryEntranceFee,
              interval,
              player,
              accounts
          beforeEach(async () => {
              accounts = await ethers.getSigners()
              player = accounts[1]
              await deployments.fixture(["mocks", "lottery"])
              // returns a new connection to xxx contract
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
              lotteryContract = await ethers.getContract("Lottery")
              // returns a new instance of the lottery contract connected to player
              lottery = lotteryContract.connect(player)
              lotteryEntranceFee = await lottery.getEntranceFee()
              interval = await lottery.getInterval()
          })
          describe("constructor", function () {
              it("initializes the lottery correctly", async () => {
                  const lotteryState = (await lottery.getRaffleState()).toString()
                  assert.equal(lotteryState, "0")
                  assert.equal(
                      interval.toString(),
                      networkConfig[network.config.chainId]["keepersUpdateInterval"]
                  )
              })
          })
          describe("enterLottery", function () {
              it("reverts when you don't pay enought", async () => {
                  await expect(lottery.enterLottery()).to.be.revertedWith("L_SenderMoreToLottery")
              })
              it("records player when they enter", async () => {
                  await lottery.enterLottery({ value: lotteryEntranceFee })
                  const contractPlayer = await lottery.getPlayer(0)
                  assert.equal(player.address, contractPlayer)
              })
              it("emits event on enter", async () => {
                  await expect(lottery.enterLottery({ value: lotteryEntranceFee })).to.emit(
                      lottery,
                      "LotteryEnter"
                  )
              })
              it("doesn't allowed entrance when lottery is calculating", async () => {
                  await lottery.enterLottery({ value: lotteryEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  // pretend to be a keeper just for test
                  await lottery.performUpkeep([])
                  await expect(
                      lottery.enterLottery({ value: lotteryEntranceFee })
                  ).to.be.revertedWith("L_LotteryNotOpen")
              })
          })
          describe("checkUpkeep", function () {
              it("returns false if people haven't sent any ETH", async () => {
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x")
                  assert(!upkeepNeeded)
              })
              it("returns false if lottery isn't open", async () => {
                  await lottery.enterLottery({ value: lotteryEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  await lottery.performUpkeep([])
                  const lotteryState = await lottery.getRaffleState()
                  const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x")
                  assert.equal(lotteryState.toString() == "1", upkeepNeeded == false)
              })
              it("returns false if enought has.t passed", async () => {
                  await lottery.enterLottery({ value: lotteryEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() - 5]) // use a higher number here if this test fails
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(!upkeepNeeded)
              })
              it("returns true if enough time has passed. has players,eth,and is open", async () => {
                  await lottery.enterLottery({ value: lotteryEntranceFee })
                  await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                  await network.provider.request({ method: "evm_mine", params: [] })
                  const { upkeepNeeded } = await lottery.callStatic.checkUpkeep("0x") // upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers)
                  assert(upkeepNeeded)
              })
          })
      })
