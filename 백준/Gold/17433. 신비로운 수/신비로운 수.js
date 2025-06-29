const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const T = Number(input[0]);
  let idx = 1;

  for (let t = 0; t < T; t++) {
    const N = Number(input[idx++]);
    const nums = input[idx++].split(' ').map(Number);

    // 모든 값이 같다면 INFINITY
    const allSame = nums.every(n => n === nums[0]);
    if (allSame) {
      console.log("INFINITY");
      continue;
    }

    // 기준값 하나 고르고 나머지들과의 차이를 절댓값으로 저장
    const diffs = [];
    for (let i = 1; i < N; i++) {
      diffs.push(Math.abs(nums[i] - nums[0]));
    }

    // 최대공약수 구하기
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

    let result = diffs[0];
    for (let i = 1; i < diffs.length; i++) {
      result = gcd(result, diffs[i]);
    }

    console.log(result);
  }
});
