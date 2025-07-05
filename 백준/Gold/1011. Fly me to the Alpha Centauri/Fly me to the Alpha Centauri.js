function minWarpCount(x, y) {
  let distance = y - x;

  let max = 0;     // 현재까지 가능한 최대 이동거리
  let count = 0;   // 공간이동 장치 작동 횟수

  while (true) {
    count++;

    // 이동 횟수 1씩 증가하며 max 거리 누적
    if (count % 2 === 0) {
      max += count / 2;
    } else {
      max += Math.floor(count / 2) + 1;
    }

    if (max >= distance) break;
  }

  return count;
}

// 입력 처리
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const T = +input[0];
  for (let i = 1; i <= T; i++) {
    const [x, y] = input[i].split(' ').map(Number);
    console.log(minWarpCount(x, y));
  }
});
