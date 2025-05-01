const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const T = parseInt(input[0]); // 테스트 케이스 수
    for (let i = 1; i <= T; i++) {
        const [A, B] = input[i].split(',').map(Number); // 콤마로 나누고 숫자로 변환
        console.log(A + B);
    }
    process.exit();
});
