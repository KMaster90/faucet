// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {

    uint public numOfFunders;

    mapping(address => bool) private funders;
    mapping(uint => address) private lutFunders;

     modifier limitWithdraw(uint withdrawAmount){
        require(withdrawAmount <= 100000000000000000, "Cannot withdraw more than 0.1 ether");
        _; // execute the body of the function you are modify
    }

    receive() external payable {}

    function emitLog() public override pure returns(bytes32){
        return "Hello World";
    }

     function addFunds() override external payable {
         test3();
        address funder = msg.sender;
        if (!funders[funder]) {
            uint index = numOfFunders++;
            funders[funder] = true;
            lutFunders[index] = funder;
        }
    }

    function test1() external onlyOwner {

    }
    function test2() external onlyOwner {
    }


    function withdraw(uint withdrawAmount)override external limitWithdraw(withdrawAmount){
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getAllFunders() external view returns (address[] memory){
        address[] memory _funders = new address[](numOfFunders);

        for (uint i = 0; i < numOfFunders; i++) {
            _funders[i] = lutFunders[i];
        }

        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns (address) {
        return lutFunders[index];
    }

}

// const instance = await Faucet.deployed();
// instance.addFunds({value:"1500000000000000000",from:accounts[0]})
// instance.addFunds({value:"1500000000000000000",from:accounts[1]})
// instance.withdraw("500000000000000000",{from:accounts[0]})
// instance.getFunderAtIndex(0)
// instance.getAllFunders()

