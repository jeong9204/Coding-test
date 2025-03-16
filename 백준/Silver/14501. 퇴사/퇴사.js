const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const N = parseInt(input[0]);
    const schedule = input.slice(1).map(line => line.split(' ').map(Number));

    // DP 배열 (최대 이익 저장)
    let dp = new Array(N + 1).fill(0);

    for (let i = 0; i < N; i++) {
        let [T, P] = schedule[i];
        let endDay = i + T; // 현재 상담을 끝낼 날짜

        // 현재 상담을 수행할 수 있는 경우
        if (endDay <= N) {
            dp[endDay] = Math.max(dp[endDay], dp[i] + P);
        }

        // 현재까지의 최대 수익을 다음 날로 전달 (이전 최댓값 유지)
        dp[i + 1] = Math.max(dp[i + 1], dp[i]);
    }

    console.log(dp[N]); // 마지막 날까지의 최대 이익 출력
});
