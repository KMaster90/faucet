const FaucetContract = artifacts.require("Faucet");

module.exports = function (deployer){
    return deployer.deploy(FaucetContract)
}
