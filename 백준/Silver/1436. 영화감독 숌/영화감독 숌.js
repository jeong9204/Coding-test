const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const N = parseInt(line.trim()); // 입력된 N
  let count = 0; // 종말의 수를 찾은 횟수
  let num = 666; // 첫 번째 종말의 수는 666부터 시작

  while (true) {
    // 숫자에 '666'이 포함되어 있는지 확인
    if (String(num).includes('666')) {
      count++;
    }

    // N번째 종말의 수를 찾으면 출력 후 종료
    if (count === N) {
      console.log(num);
      break;
    }

    // 숫자 증가
    num++;
  }

  rl.close();
});
