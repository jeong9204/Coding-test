const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const [h, i, a, r, c] = line.split(' ').map(Number);
    console.log(h * i - a * r * c);
    rl.close();
});
