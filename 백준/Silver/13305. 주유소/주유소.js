const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let input = [];

rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const N = +input[0]; // 도시 개수
  const distances = input[1].split(' ').map(Number); // 도시 간 거리
  const prices = input[2].split(' ').map(Number); // 주유소 가격

  let totalCost = 0;
  let minPrice = prices[0]; // 시작은 첫 번째 도시의 주유 가격

  for (let i = 0; i < N - 1; i++) {
    // 현재 도시의 주유소 가격이 더 싸면 갱신
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }
    // 최소 가격으로 i번째 도로 거리만큼 이동
    totalCost += minPrice * distances[i];
  }

  console.log(totalCost);
});
