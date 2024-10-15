const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input1) => {
    rl.question('', (input2) => {
        const a = parseInt(input1);
        const b = parseInt(input2);

        if (a >= 20 && a <= 23) {
            console.log(24 - a + b);
        } else {
            console.log(b - a);
        }

        rl.close();
    });
});
