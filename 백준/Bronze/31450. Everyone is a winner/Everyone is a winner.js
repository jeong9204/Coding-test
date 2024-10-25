const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const [m, k] = input.split(' ').map(Number); // 메달의 수와 아이들의 수를 입력받음

    if (m % k === 0) {
        console.log('Yes');
    } else {
        console.log('No');
    }

    rl.close();
});
