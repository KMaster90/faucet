// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Storage {

    // kecck256(key . slot)
    mapping(uint => uint) public aa; // slot 0
    mapping(address => uint) public bb; // slot 1

    // kecck256(slot) + index of the item
    uint[] public cc; // slot 2

    uint8 public a = 7; // 1 byte
    uint16 public b = 10; // 2 bytes
    address public c = 0x3A85B44D12d536EB5308bC0265bF1E819A02b2aA; // 20 bytes
    bool d = true;  // 1 byte
    uint64 public e = 15;  // 8 bytes
    //(all above is) 32 bytes, all values will be stored in --> slot 3
    // 0x 0f 01 3a85b44d12d536eb5308bc0265bf1e819a02b2aa 000a 07

    uint256 public f = 200;  // 32 bytes  --> slot 4 (0x c8)
    uint8 public g = 40;  // 1 byte --> slot 5 (0x 28)
    uint256 public h = 789;  // 32 bytes --> slot 6 (0x 0315)

    constructor(){ // called when is deployed
        cc.push(1);
        cc.push(10);
        cc.push(100);

        aa[2] = 4;
        aa[3] = 10;
        bb[0x3A85B44D12d536EB5308bC0265bF1E819A02b2aA] = 100;
    }

}

// 0x 0000000000000000000000000000000000000000000000000000000000000000 0000000000000000000000000000000000000000000000000000000000000001 (64chars * 32bytes)for yhe key + 32bytes for the slot
