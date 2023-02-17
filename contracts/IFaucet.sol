// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// they cannot inherit from other smart contracts
// they can only inherit from other interfaces

// they cannot declare a constructor
// they cannot declare state variables
// all declared functions have to be external

interface IFaucet {
    function addFunds() external payable;
    function withdraw(uint withdrawAmount) external;
}
