const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, Date.now(), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    restoreChainFromData(data) {
        this.chain = data.chain.map(blockData => {
            let block = new Block(blockData.index, blockData.timestamp, blockData.data, blockData.previousHash);
            block.hash = blockData.hash;
            block.nonce = blockData.nonce;
            return block;
        });
        this.difficulty = data.difficulty;
    }
}

module.exports = Blockchain;