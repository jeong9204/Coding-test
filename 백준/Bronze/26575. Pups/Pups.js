const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line);
});

rl.on('close', () => {
    let n = parseInt(inputLines[0]);

    for (let i = 1; i <= n; i++) {
        let [d, f, p] = inputLines[i].split(' ').map(Number);
        let result = (d * f * p).toFixed(2);
        console.log(`$${result}`);
    }
});
