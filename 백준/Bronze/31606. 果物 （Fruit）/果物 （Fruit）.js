const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(parseInt(line));
    if (inputs.length === 2) {
        const [x, y] = inputs;
        console.log(x + y + 3);
        rl.close();
    }
});
