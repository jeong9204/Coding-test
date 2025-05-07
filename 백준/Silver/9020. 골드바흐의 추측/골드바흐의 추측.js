const readline = require('readline');

// 입력 받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const T = Number(input[0]);
  const testCases = input.slice(1).map(Number);
  const MAX = 10000;

  // 1. 에라토스테네스의 체로 소수 미리 구하기
  const isPrime = Array(MAX + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= MAX; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= MAX; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // 2. 테스트 케이스별로 골드바흐 파티션 구하기
  for (const n of testCases) {
    let a = n / 2;
    let b = n / 2;

    // 가장 차이가 적은 파티션을 찾아야 하므로 가운데부터 시작해서 양쪽으로 퍼짐
    while (a > 0) {
      if (isPrime[a] && isPrime[b]) {
        console.log(`${a} ${b}`);
        break; // 찾았으면 바로 종료 (차이가 가장 작은 거라서)
      }
      a--;
      b++;
    }
  }
});
