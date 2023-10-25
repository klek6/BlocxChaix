const fs = require('fs');

const numOfTransactions = 10;  // You can change this number as needed
const maxAmount = 1000;         // Maximum amount for a transaction

function generateRandomAddress() {
    return 'address' + Math.floor(Math.random() * 100);
}

function generateRandomAmount() {
    return Math.floor(Math.random() * maxAmount) + 1;  // Avoiding transaction amount of 0
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