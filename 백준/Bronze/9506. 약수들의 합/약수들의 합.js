const readline = require('readline');

// 입력을 받을 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {

  for (let i = 0; i < input.length; i++) {
    const n = Number(input[i]);

    // 입력 종료 조건 (-1 입력시 종료)
    if (n === -1) break;

    const divisors = [];

    // 약수 구하기 (자기 자신 제외 -> 1부터 n/2까지만 확인하면 된다)
    for (let j = 1; j <= Math.floor(n / 2); j++) {
      if (n % j === 0) {
        divisors.push(j);
      }
    }

    // 약수의 합 계산
    const sum = divisors.reduce((acc, cur) => acc + cur, 0);

    // 완전수 판별 후 출력
    if (sum === n) {
      console.log(`${n} = ${divisors.join(' + ')}`);
    } else {
      console.log(`${n} is NOT perfect.`);
    }
  }

});
