const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (input) => {
    const n = parseInt(input);

    // V를 출력 (5로 나눈 몫 만큼)
    let result = '';
    for (let i = 0; i < Math.floor(n / 5); i++) {
        result += 'V';
    }

    // I를 출력 (5로 나눈 나머지 만큼)
    for (let i = 0; i < n % 5; i++) {
        result += 'I';
    }

    console.log(result);
    rl.close();
});
