const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];
rl.on('line', (line) => {
    inputs.push(line);
});

rl.on('close', () => {
    let loopCount = parseInt(inputs[0]);
    for (let i = 1; i <= loopCount; i++) {
        let userInput = parseInt(inputs[i]);
        let copied = userInput;
        console.log(userInput, copied);
    }
});
