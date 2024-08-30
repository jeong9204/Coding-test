const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(parseInt(line));
    if (input.length === 2) {
        const a = input[0];
        const b = input[1];
        console.log(b - a);
        rl.close();
    }
});
