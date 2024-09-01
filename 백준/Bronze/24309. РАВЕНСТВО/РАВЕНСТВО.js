const readline = require('readline');
const { BigInt } = global;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(BigInt(line.trim()));

    if (inputs.length === 3) {
        const a = inputs[0];
        let b = inputs[1];
        const c = inputs[2];

        b = b - c;
        b = b / a;

        console.log(b.toString());
        rl.close();
    }
});
