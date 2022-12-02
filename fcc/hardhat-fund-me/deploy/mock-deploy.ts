
const { network : net} = require('hardhat');
const DECIMALS = '8';
const INITIAL_PRICE = '2000000000';
module.exports = async (hardhat:any) => {
    const { getNamedAccounts, deployments } = hardhat;
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;
    const chainId = net.config.chainId;
    if (chainId === 31337) {
        log('Local network detected! deploying mock...')
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS,INITIAL_PRICE]
        })
        log('Mocks has deployed')
    }
}
module.exports.tags = ["all", "mocks"]