const StorageContract = artifacts.require("Storage");

module.exports = function (deployer){
    return deployer.deploy(StorageContract)
}
