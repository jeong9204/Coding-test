const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const N = parseInt(line.trim());
  const primeFactors = [];

  let num = N;
  let factor = 2;

  while (num > 1) {
    // 소인수분해 진행
    while (num % factor === 0) {
      primeFactors.push(factor);
      num /= factor;
    }
    factor++;
    // 최적화: 현재 인수가 num의 제곱근보다 크다면 더 이상 검사 필요 없음
    if (factor * factor > num && num > 1) {
      primeFactors.push(num);
      break;
    }
  }

  // 결과 출력
  console.log(primeFactors.join('\n'));
  rl.close();
});
