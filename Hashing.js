const crypto = require('crypto');

function calculateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

function merkleRoot(transactions) {
    if (transactions.length === 0) return null;

    let hashes = transactions.map(tx => calculateHash(JSON.stringify(tx)));

    while (hashes.length > 1) {
        let nextLevel = [];

        for (let i = 0; i < hashes.length; i += 2) {
            if (i + 1 < hashes.length) {
                nextLevel.push(calculateHash(hashes[i] + hashes[i + 1]));
            } else {
                nextLevel.push(hashes[i]);
            }
        }

        hashes = nextLevel;
    }

    return hashes[0];
}

module.exports = { calculateHash, merkleRoot };