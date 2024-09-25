const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const n = parseInt(input);

    const digitTen = Math.floor(n / 10);
    const digitOne = n % 10;

    if (digitTen === digitOne) {
        console.log("1");
    } else {
        console.log("0");
    }

    rl.close();
});
