const fs = require('fs');
const Block = require('./Block');
const Blockchain = require('./Blockchain');

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
const maxBundleSize = 5;

const bundled = bundleTransactions(transactions, minBundleSize, maxBundleSize);

// Print and add bundled transactions to the blockchain
bundled.forEach((bundle, index) => {
    console.log(`Bundle ${index + 1}:`, bundle);
    RtuCoin.addBlock(new Block(index, Date.now(), bundle));
});

let validity = RtuCoin.isChainValid();
fs.writeFileSync('BlockchainLedger.json', JSON.stringify(RtuCoin, null, 4));

console.log(validity);
