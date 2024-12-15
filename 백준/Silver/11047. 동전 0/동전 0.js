const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  // Parse input
  const [N, K] = input[0].split(' ').map(Number); // N: 동전 종류, K: 목표 금액
  const coins = input.slice(1).map(Number); // 동전의 가치 리스트

  // Reverse the coin list to start with the largest coin
  coins.reverse();

  let remaining = K;
  let count = 0;

  for (const coin of coins) {
    if (remaining === 0) break; // 목표 금액을 다 채웠으면 종료
    if (coin <= remaining) {
      count += Math.floor(remaining / coin); // 현재 동전으로 가능한 최대 개수
      remaining %= coin; // 남은 금액 업데이트
    }
  }

  console.log(count);
});
