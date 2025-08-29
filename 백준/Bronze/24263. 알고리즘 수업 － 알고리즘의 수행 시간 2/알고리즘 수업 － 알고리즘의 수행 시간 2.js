// BOJ 24263 - 알고리즘 수업: 수행 시간 2
// 코드1은 for i=1..n 에서 정확히 n번 실행됨 → 출력: n, 1

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
rl.on('line', (line) => {
  n = parseInt(line.trim(), 10);
}).on('close', () => {
  // 첫째 줄: 코드1 수행 횟수, 둘째 줄: 최고차항 차수
  console.log(`${n}\n1`);
});
