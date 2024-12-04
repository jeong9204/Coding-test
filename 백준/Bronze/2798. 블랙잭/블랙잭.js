const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const [N, M] = input[0].split(' ').map(Number); // 카드 개수 N, 목표값 M
    const cards = input[1].split(' ').map(Number); // 카드에 쓰여 있는 수

    let maxSum = 0;

    // 세 장의 카드를 고르는 모든 경우의 수를 확인
    for (let i = 0; i < N - 2; i++) {
        for (let j = i + 1; j < N - 1; j++) {
            for (let k = j + 1; k < N; k++) {
                const sum = cards[i] + cards[j] + cards[k];
                // 합이 M 이하이면서 최대값 갱신
                if (sum <= M && sum > maxSum) {
                    maxSum = sum;
                }
            }
        }
    }

    console.log(maxSum);
});
