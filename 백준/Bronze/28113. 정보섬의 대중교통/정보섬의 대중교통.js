const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const [n, a, b] = input.split(' ').map(Number);

    if (n <= b && b === a) {
        console.log('Anything');
    } else if (n <= b && b - a > 0) {
        console.log('Bus');
    } else {
        console.log('Subway');
    }

    rl.close();
});
