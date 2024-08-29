const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (x) => {
    const num = parseInt(x);
    console.log(num * num * num);
    rl.close();
});
