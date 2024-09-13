const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const [a, b, c] = input.split(' ').map(Number);
    console.log(Math.floor(b / a) * 3 * c);
    rl.close();
});
