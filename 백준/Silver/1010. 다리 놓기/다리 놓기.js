const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    let T = parseInt(input[0]); // 테스트 케이스 개수

    let results = [];
    for (let i = 1; i <= T; i++) {
        let [N, M] = input[i].split(' ').map(Number);
        results.push(binomialCoefficient(M, N)); // 조합 값 계산
    }

    console.log(results.join('\n'));
    process.exit();
});

// 조합 계산 (팩토리얼을 사용하지 않고 직접 계산)
function binomialCoefficient(M, N) {
    let result = 1;
    for (let i = 0; i < N; i++) {
        result *= (M - i);
        result /= (i + 1);
    }
    return Math.round(result);
}
