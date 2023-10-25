const fs = require('fs');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

const crypto = require('crypto');

function calculateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function merkleRoot(transactions) {
    if (transactions.length === 0) return null;

    let hashes = transactions.map(tx => calculateHash(JSON.stringify(tx)));

    while (hashes.length > 1) {
        let nextLevel = [];

        // Pair the hashes and compute new hashes.
        for (let i = 0; i < hashes.length; i += 2) {
            if (i + 1 < hashes.length) {
                nextLevel.push(calculateHash(hashes[i] + hashes[i + 1]));
            } else {
                // If there's a lone hash, just push it up.
                nextLevel.push(hashes[i]);
            }
        }

        hashes = nextLevel;
    }

    return hashes[0]; // Return the Merkle root.
}

let RtuCoin = new Blockchain();

const feedData = fs.readFileSync('FeedData.json', 'utf8');
const transactions = JSON.parse(feedData);

// Function to bundle transactions
function bundleTransactions(transactions, minSize, maxSize) {
    let bundledTransactions = [];
    let remainingTransactions = [...transactions];

    while (remainingTransactions.length > 0) {
        // Determine random bundle size between minSize and maxSize.
        // Math.min is used to ensure we don't exceed the remaining transaction count.
        let bundleSize = Math.min(minSize + Math.floor(Math.random() * (maxSize - minSize + 1)), remainingTransactions.length);

        // Take the first 'bundleSize' transactions from remainingTransactions.
        let currentBundle = remainingTransactions.splice(0, bundleSize);
        bundledTransactions.push(currentBundle);
    }

    return bundledTransactions;
}

// Specify the bundling range here
const minBundleSize = 1;
const maxBundleSize = 50;

const bundled = bundleTransactions(transactions, minBundleSize, maxBundleSize);

// Print and add bundled transactions to the blockchain
bundled.forEach((bundle, index) => {
    // Create the Merkle root from the bundle.
    let root = merkleRoot(bundle);

    // Add the Merkle root to the block.
    RtuCoin.addBlock(new Block(index, Date.now(), root));
});

let validity = RtuCoin.isChainValid();
fs.writeFileSync('BlockchainLedger.json', JSON.stringify(RtuCoin, null, 4));

console.log("Blockchain is valid? - " + validity);
