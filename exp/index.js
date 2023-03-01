const EthereumTx = require('ethereumjs-tx').Transaction;
// original works
// 0xf86c01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842
// 0x
// f8 = f7 + LENGTH_OF_PAYLOAD in binary form in bytes
// 6c = LENGTH_OF_PAYLOAD = 108 Bytes (coppie HEX)
// 01 = nonce
// 85 0c4b201000 = gasPrice
// 82 5208 = gas Limit
// 94 9cbfd6ebdb9cfcccd6b043f43e524583486d455e = to
// 88 0490283b23ec8f76 = value
// 80 = data
// 25 = v
// a0 67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c = r
// a0 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842 = s
// my have a problem with chain mannet???
// 0x02f87101830253a08085043a46983782753094388c818ca8b9251b393131c08a736a67ccb19297874975ffb669c23d80c080a07f4fcbc6b6273158a5eea06c90967b14df28c33b332b3fb724c05e5e1a3b1310a0408c194b99f35fa8f3bbab32fa5f2b531523d38e88b0442a6a75e3d315497bce
// 0xf86e830253a085043a46983782753094388c818ca8b9251b393131c08a736a67ccb19297874975ffb669c23d8000a07f4fcbc6b6273158a5eea06c90967b14df28c33b332b3fb724c05e5e1a3b1310a0408c194b99f35fa8f3bbab32fa5f2b531523d38e88b0442a6a75e3d315497bce
// 0x
// 02
// f8 = f7 + LENGTH_OF_PAYLOAD in binary form in bytes
// 71 = LENGTH_OF_PAYLOAD = 113 Bytes (coppie HEX)
// 01 = nonce
// 83 0253a0
// 80
// 85 043a469837 = gasPrice
// 82 7530 = gas Limit
// 94 388c818ca8b9251b393131c08a736a67ccb19297 = to
// 87 4975ffb669c23d = value
// 80 = data
// c0
// 80 0 = v
// a0 7f4fcbc6b6273158a5eea06c90967b14df28c33b332b3fb724c05e5e1a3b1310 = r
// a0 408c194b99f35fa8f3bbab32fa5f2b531523d38e88b0442a6a75e3d315497bce = s
const txParams = {
    nonce: '0x0253A0',
    gasPrice: '0x043A469837',
    gasLimit: '0x7530',
    to: '0x388C818CA8B9251b393131C08a736A67ccB19297',
    value: '0x004975FFB669C23D',
    data:"0x",
    v: '0x0',
    r: '0x7f4fcbc6b6273158a5eea06c90967b14df28c33b332b3fb724c05e5e1a3b1310',
    s: '0x408c194b99f35fa8f3bbab32fa5f2b531523d38e88b0442a6a75e3d315497bce'
}
const decoded = {
    "blockHash": "0x90e1f8ee8f898d76f5336d4cadaf83cd7a3f5a4de3a0a22d9ab73e445cea1558",
    "blockNumber": "0xff4fe8",
    "from": "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5",
    "gas": "0x7530",
    "gasPrice": "0x43a469837",
    "maxFeePerGas": "0x43a469837",
    "maxPriorityFeePerGas": "0x0",
    "hash": "0x8a056b01c32a1535fb0222baafdbcdc19132f3270eccc8489b43b07b6a2db814",
    "input": "0x",
    "nonce": "0x253a0",
    "to": "0x388c818ca8b9251b393131c08a736a67ccb19297",
    "transactionIndex": "0x97",
    "value": "0x4975ffb669c23d",
    "type": "0x2",
    "accessList": [],
    "chainId": "0x1",
    "v": "0x0",
    "r": "0x7f4fcbc6b6273158a5eea06c90967b14df28c33b332b3fb724c05e5e1a3b1310",
    "s": "0x408c194b99f35fa8f3bbab32fa5f2b531523d38e88b0442a6a75e3d315497bce"
}
const txParamsLesson = {
    nonce: "0x01",
    gasPrice: "0x0C4B201000",
    gasLimit: "0x5208",
    to: "0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e",
    value: "0x0490283B23EC8F76",
    data: "0x",
    v: "0x25",
    r: "0x67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c",
    s: "0x0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842"
}

// const tx = new EthereumTx(decoded,{chain:"mainnet"});
// const tx = new EthereumTx(txParams,{chain:"mainnet"});
function extracted(transaction,privateKey=null) {
    const tx = new EthereumTx(transaction, {chain: "mainnet"});
    if(!!privateKey) tx.sign(privateKey);
    const key = tx.getSenderPublicKey().toString("hex");
    const address = tx.getSenderAddress().toString("hex");
    const isValid = tx.verifySignature();
    return {key, address, isValid};
}

console.log( extracted(txParamsLesson));

const {v,r,s,...txParamsNoSign} = txParamsLesson;
const myPrivateKey = Buffer.from('ganachePrivateKey','hex');

console.log( extracted(txParamsNoSign,myPrivateKey));
