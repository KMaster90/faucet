// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Faucet {
   // storage variables
    uint public funds = 1000; //positive values only
    int public counter = -10; //signed integer
    uint32 public max = 2**32 - 1; //max value for uint32
    uint8 public min = 0; //min value for uint8

    address[] public funders; //dynamic array
    // private -> can be accessible only within the smart contract
    // internal -> can be accessible within smart contract and also derived smart contract

    // this is a special function that is called when you make a transaction that doesn't specify a function name to call

    // External functions are part of the contract interface, which means they can be called from other contracts and via transactions. An external function f cannot be called internally (i.e. f() does not work, but this.f() works). External functions are sometimes more efficient when they receive large arrays of data.
    receive() external payable {}
    function addFunds() external payable{
        funders.push(msg.sender);
    }

    function getAllFunders() public view returns(address[] memory){
        return funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        address[] memory _funders = getAllFunders();
        return _funders[index];
    }

//    function justTesting() external pure returns(uint){
//        return 2+2;
//    }
    // pure, view - read-only functions, no gas free
    // view - it indicates that the function will not alter the storage state in any way
    // pure - even more strict, indicating that the function will not read or write any data from or to the blockchain

    // Transactions (can generate state changes) and require gas fee
    // read-only call, no gas free

    // to talk to the node on the network you can make JSON-RPC http calls
}

    // const instance = await Faucet.deployed();
    // instance.addFunds({value:"1500000000000000000",from:accounts[2]})


    // Block info
    // Nonce - a hash that when combined with minHash proofs that the block has gone through proof of work(POW)
    // 8 bytes => 64 bits

