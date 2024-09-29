const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(parseInt(line));

    const [a] = inputs;
    let num = a/4.0
    console.log(num)
});