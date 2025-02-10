const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const [N, K] = line.split(' ').map(Number);

    // 팩토리얼 계산 함수
    const factorial = (num) => {
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    };

    // 이항 계수 계산
    const binomialCoefficient = factorial(N) / (factorial(K) * factorial(N - K));

    console.log(binomialCoefficient);
    rl.close();
});
