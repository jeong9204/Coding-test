// 세 막대 - BOJ 14215
// 정렬 후 a+b>c면 그대로 합, 아니면 c를 a+b-1로 줄여 둘레 최대화

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tokens = [];
rl.on('line', (line) => {
  tokens = tokens.concat(line.trim().split(/\s+/).map(Number));
}).on('close', () => {
  let [a, b, c] = tokens;
  // 정렬
  [a, b, c] = [a, b, c].sort((x, y) => x - y);

  let ans;
  if (a + b > c) {
    ans = a + b + c;
  } else {
    ans = 2 * (a + b) - 1;
  }
  console.log(ans.toString());
});
