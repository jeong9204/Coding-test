const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(parseInt(line));

    if (inputs.length === 2) {
        const [a, b] = inputs;

        if (a < b) {
            console.log("-1");
        } else if (a === b) {
            console.log("0");
        } else {
            console.log("1");
        }
        
        rl.close();
    }
});
