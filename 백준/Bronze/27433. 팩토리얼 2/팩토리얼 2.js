const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const n = parseInt(input);

    let factorial = 1;
    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }

    console.log(factorial);
    rl.close();
});
