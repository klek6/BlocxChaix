const fs = require('fs');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

let RtuCoin = new Blockchain();

const feedData = fs.readFileSync('FeedData.json', 'utf8');
const transactions = JSON.parse(feedData);

transactions.forEach((transaction, index) => {
    RtuCoin.addBlock(new Block(index, Date.now(), transaction));
});

let validity = RtuCoin.isChainValid();

fs.writeFileSync('BlockchainLedger.json', JSON.stringify(RtuCoin, null, 4));

console.log(validity);
