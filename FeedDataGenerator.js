// To run, View -> Terminal (opens Developer PowerShell) -> there, write "node FeedDataGenerator.js"

const fs = require('fs');

const numOfTransactions = 1000;
const maxAmount = 1000;

function generateRandomAddress() {
    return 'address' + Math.floor(Math.random() * 100);
}

function generateRandomAmount() {
    return Math.floor(Math.random() * maxAmount) + 1;
}

function generateTransactions(num) {
    let transactions = [];
    for (let i = 0; i < num; i++) {
        let transaction = {
            fromAddress: generateRandomAddress(),
            toAddress: generateRandomAddress(),
            amount: generateRandomAmount()
        };
        transactions.push(transaction);
    }
    return transactions;
}

const transactions = generateTransactions(numOfTransactions);

fs.writeFileSync('FeedData.json', JSON.stringify(transactions, null, 4));

console.log(`Generated and saved ${numOfTransactions} random transactions to FeedData.json`);