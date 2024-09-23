const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (answer) => {
    const [T, S] = answer.trim().split(' ').map(Number);

    if (S === 0 && (T >= 12 && T <= 16)) {
        console.log('320');
    } else {
        console.log('280');
    }

    rl.close();
});
