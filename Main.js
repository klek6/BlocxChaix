const Block = require('./Block');
const Blockchain = require('./Blockchain');

let RtuCoin = new Blockchain();
RtuCoin.addBlock(new Block(1, "20/07/2017", { amount: 4 }));
RtuCoin.addBlock(new Block(2, "20/07/2017", { amount: 8 }));

let validity = RtuCoin.isChainValid();

console.log(JSON.stringify(RtuCoin, null, 4));
console.log(validity);