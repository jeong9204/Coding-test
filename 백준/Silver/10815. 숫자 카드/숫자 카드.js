const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0]);                              // 상근이가 가진 카드의 개수
  const cards = input[1].split(' ').map(Number);             // 상근이가 가진 카드들 (정수 배열)
  const M = parseInt(input[2]);                              // 확인할 숫자의 개수
  const queries = input[3].split(' ').map(Number);           // 확인할 숫자들 (정수 배열)

  // 상근이가 가진 카드들로 Set 생성 (중복 없음)
  const cardSet = new Set(cards);

  // 각 query에 대해 카드가 있으면 1, 없으면 0을 출력
  const result = queries.map(num => cardSet.has(num) ? "1" : "0");

  console.log(result.join(' '));
});
