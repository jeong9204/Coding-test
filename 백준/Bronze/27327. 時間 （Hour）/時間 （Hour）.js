const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (X) => {
    console.log(X * 24);
    rl.close();
});
