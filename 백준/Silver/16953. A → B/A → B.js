const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
  if (input.length === 1) rl.close();
});

rl.on('close', () => {
  let [A, B] = input[0].split(' ').map(Number);
  let count = 1; // 연산 횟수 + 1

  while (B > A) {
    if (B % 10 === 1) {
      // B의 끝이 1이면 -> 오른쪽 1을 제거
      B = Math.floor(B / 10);
    } else if (B % 2 === 0) {
      // 짝수이면 2로 나눔
      B /= 2;
    } else {
      // 위 두 방법이 안되면 A로 만들 수 없음
      console.log(-1);
      return;
    }
    count++;
  }

  // 성공적으로 A에 도달하면 출력
  if (B === A) console.log(count);
  else console.log(-1);
});
