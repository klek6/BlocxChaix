const fs = require('fs');
const Blockchain = require('./Blockchain');
const Block = require('./Block');

// Load the blockchain from the file
const blockchainData = fs.readFileSync('BlockchainLedger.json', 'utf8');
const loadedBlockchain = JSON.parse(blockchainData);

// Resets the blockchain
function createFreshBlockchain() {
    let RtuCoin = new Blockchain();
    RtuCoin.restoreChainFromData(loadedBlockchain);
    return RtuCoin;
}

let RtuCoin = createFreshBlockchain();

console.log("Initial Blockchain Validity: " + RtuCoin.isChainValid());

// 1. Tampering a block in the middle
let middleIndex = Math.floor(RtuCoin.chain.length / 2);
if (RtuCoin.chain[middleIndex]) {
    RtuCoin.chain[middleIndex].data = "Tampered Data";
    console.log("\nAfter tampering middle block...");
    console.log("Blockchain Validity: " + RtuCoin.isChainValid());
}
RtuCoin = createFreshBlockchain();

// 2. Tampering the last block
if (RtuCoin.chain.length > 0) {
    RtuCoin.chain[RtuCoin.chain.length - 1].data = "Tampered Data in the last block";
    console.log("\nAfter tampering last block...");
    console.log("Blockchain Validity: " + RtuCoin.isChainValid());
}
RtuCoin = createFreshBlockchain();

// 3. Adding another block at the end
const newBlock = new Block(RtuCoin.chain.length, Date.now(), "Some new data");
RtuCoin.addBlock(newBlock);
console.log("\nAfter adding a new block at the end...");
console.log("Blockchain Validity: " + RtuCoin.isChainValid());