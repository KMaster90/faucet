const TestContract = artifacts.require("Test");

module.exports = function (deployer){
    return deployer.deploy(TestContract)
}
