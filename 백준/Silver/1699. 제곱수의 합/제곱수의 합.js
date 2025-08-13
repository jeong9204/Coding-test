const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', (line) => input.push(line.trim()))
  .on('close', () => {
    const N = Number(input[0]);

    // 1) 사용할 제곱수들을 미리 구해두기
    const squares = [];
    for (let k = 1; k * k <= N; k++) {
      squares.push(k * k);
    }

    // 2) dp[i] = i를 제곱수 합으로 만드는 최소 항 개수
    const dp = new Array(N + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= N; i++) {
      for (const sq of squares) {
        if (sq > i) break;
        // i에서 제곱수 sq 하나를 쓰면 남는 i - sq의 최솟값에 +1
        dp[i] = Math.min(dp[i], dp[i - sq] + 1);
      }
    }

    console.log(dp[N]);
  });
