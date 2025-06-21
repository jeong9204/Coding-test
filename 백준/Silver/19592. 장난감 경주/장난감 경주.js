const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let input = [];
rl.on('line', line => input.push(line.trim()));
rl.on('close', () => {
  const T = +input[0];
  let index = 1;

  for (let t = 0; t < T; t++) {
    const [N, X, Y] = input[index++].split(' ').map(Number);
    const V = input[index++].split(' ').map(Number);
    const yourSpeed = V[N - 1];

    // 다른 사람들 중 가장 빠른 시간
    let bestTime = Infinity;
    for (let i = 0; i < N - 1; i++) {
      bestTime = Math.min(bestTime, X / V[i]);
    }

    // 부스터 없이도 우승 가능
    if (X / yourSpeed < bestTime) {
      console.log(0);
      continue;
    }

    // 이분 탐색: 최소 Z 찾기
    let left = 1, right = Y, answer = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const remain = X - mid;
      const time = 1 + (remain > 0 ? remain / yourSpeed : 0);

      if (time < bestTime) {
        answer = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    console.log(answer);
  }
});
