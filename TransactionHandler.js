function bundleTransactions(transactions, minSize, maxSize) {
    let bundledTransactions = [];
    let remainingTransactions = [...transactions];

    while (remainingTransactions.length > 0) {
        let bundleSize = Math.min(minSize + Math.floor(Math.random() * (maxSize - minSize + 1)), remainingTransactions.length);

        let currentBundle = remainingTransactions.splice(0, bundleSize);
        bundledTransactions.push(currentBundle);
    }

    return bundledTransactions;
}

module.exports = { bundleTransactions };
