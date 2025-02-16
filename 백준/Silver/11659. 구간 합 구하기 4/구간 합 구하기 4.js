const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const [N, M] = input[0].split(' ').map(Number);
    const arr = input[1].split(' ').map(Number);

    // 🔹 1. 누적 합 배열 생성
    let prefixSum = new Array(N + 1).fill(0);
    for (let i = 1; i <= N; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
    }

    // 🔹 2. 구간 합 계산
    let result = [];
    for (let k = 2; k < 2 + M; k++) {
        const [i, j] = input[k].split(' ').map(Number);
        result.push(prefixSum[j] - prefixSum[i - 1]);
    }

    // 🔹 3. 결과 출력
    console.log(result.join('\n'));
});
