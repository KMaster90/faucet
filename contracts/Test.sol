// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Test {

    function test(uint testNum) external pure returns (uint data){

        assembly {
            mstore(0x40,0x90)
        }

        uint8[3] memory items = [1,2,3];
        items;
        assembly {
            data := mload(0x40)
        }
        return testNum;
    }

    function test2() external pure returns (uint data){
        assembly {
            let fmp := mload(0x40)
        // hello
            mstore(add(fmp,0x00), 0x68656C6C6F) // hello => 0x68656C6C6F
            data := mload(add(fmp,0x00))
        }
    }

}

