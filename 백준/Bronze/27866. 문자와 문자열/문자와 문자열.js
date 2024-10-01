const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(line);
    if (inputs.length === 2) {
        const s = inputs[0];
        const index = parseInt(inputs[1]);
        console.log(s[index - 1]);
        rl.close();
    }
});
