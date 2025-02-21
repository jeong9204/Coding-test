const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const T = parseInt(input[0], 10); // 테스트 케이스 개수
  let results = [];
  
  for (let i = 1; i <= T; i++) {
    const [A, B] = input[i].split(' ').map(Number);
    const lcm = (A * B) / gcd(A, B);
    results.push(lcm);
  }
  
  console.log(results.join('\n'));
});

// 유클리드 호제법을 이용한 최대공약수(GCD) 계산 함수
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
