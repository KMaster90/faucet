// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Owned {

    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function");
        _; // execute the body of the function you are modify
    }
    function transferOwnership(address newOwner) external onlyOwner{
        owner = newOwner;
    }

}
