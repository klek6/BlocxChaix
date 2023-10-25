const fs = require('fs');
const Block = require('./Block');
const Blockchain = require('./Blockchain');
const { calculateHash, merkleRoot } = require('./hashing');
const { bundleTransactions } = require('./transactionHandler');

let RtuCoin = new Blockchain();

const feedData = fs.readFileSync('FeedData.json', 'utf8');
const transactions = JSON.parse(feedData);

const minBundleSize = 1;
const maxBundleSize = 50;

const bundled = bundleTransactions(transactions, minBundleSize, maxBundleSize);

bundled.forEach((bundle, index) => {
    let root = merkleRoot(bundle);
    RtuCoin.addBlock(new Block(index, Date.now(), root));
});

let validity = RtuCoin.isChainValid();
fs.writeFileSync('BlockchainLedger.json', JSON.stringify(RtuCoin, null, 4));

console.log("Blockchain is valid? - " + validity);
