const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let index = 0;

rl.on('line', (line) => {
    input.push(line.trim());
    index++;
    if (index === 2) {
        const r = parseInt(input[0]);
        const c = parseInt(input[1]);
        let output = '';

        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                output += '*';
            }
            output += '\n';
        }
        console.log(output);
        rl.close();
    }
});
