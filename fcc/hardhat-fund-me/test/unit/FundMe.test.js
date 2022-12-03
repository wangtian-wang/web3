const { expect,assert} = require('chai');
const { network, deployments, ethers } = require('hardhat');
const { idText } = require('typescript');
const { developmentChains } = require("../../helper-hardhat-config");
console.log('------------------------')
describe('FundMe', function () {
    let fundMe, mockV3Aggregator, deployer;
    const sendValue = ethers.utils.parseEther("1");
    beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        // await deployments.fixture(["all"]);
        fundMe = await ethers.getContract('FundMe', deployer);
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
    })
    describe('constructor', function () {
        it("test for FundMe constract's constructor", async () => {
            const response = await fundMe.getPriceFeed();
            assert.equal(response,mockV3Aggregator.address)
        })
    })
    describe('fund test',function() {
        it("Fails if you don't send enough ETH", async () => {
            await expect(fundMe.fund()).to.be.revertedWith(
                "You need to spend more ETH!"
            )
        })
        it("Updates the amount funded data structure", async () => {
            await fundMe.fundMe({ value: sendValue })
            const response = await fundMe.getAddressToAmountFunded(deployer)
            assert.equal(response.toString(),sendValue.toString())
        })
        it("Adds funder to array of funders", async () => {
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.getFunder(0);
            assert.equal(response, deployer);
        })
    })
    describe("withdraw test", async () => {
        beforeEach(async () => {
            await fundMe.fund({value: sendValue})
        })

    })
})