const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', line => {
  input.push(line);
}).on('close', () => {
  const N = parseInt(input[0]); // 카드 개수
  const freqMap = new Map();    // 숫자별 등장 횟수 저장용 Map

  for (let i = 1; i <= N; i++) {
    const num = BigInt(input[i]); // 문제 조건상 수의 범위가 크기 때문에 BigInt 사용
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  let maxFreq = 0n;
  let result = null;

  // Map을 순회하면서 가장 많이 등장한 수, 가장 작은 수 찾기
  for (const [key, count] of freqMap.entries()) {
    if (BigInt(count) > maxFreq) {
      maxFreq = BigInt(count);
      result = key;
    } else if (BigInt(count) === maxFreq && key < result) {
      result = key;
    }
  }

  console.log(result.toString());
});
