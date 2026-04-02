const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const durability = input[1].split(' ').map(Number);

// 각 칸에 로봇이 있는지 여부
const robots = Array(2 * N).fill(false);

let step = 0;

while (true) {
  step++;

  // 1. 벨트와 로봇을 함께 회전
  durability.unshift(durability.pop());
  robots.unshift(robots.pop());

  // 내리는 위치에 로봇이 오면 즉시 내린다
  robots[N - 1] = false;

  // 2. 로봇 이동
  // 먼저 올라간 로봇부터 이동해야 하므로 내리는 위치 바로 앞부터 거꾸로 확인
  for (let i = N - 2; i >= 0; i--) {
    if (robots[i] && !robots[i + 1] && durability[i + 1] > 0) {
      robots[i] = false;
      robots[i + 1] = true;
      durability[i + 1]--;
    }
  }

  // 이동 후 내리는 위치의 로봇은 즉시 내린다
  robots[N - 1] = false;

  // 3. 올리는 위치에 로봇 올리기
  if (durability[0] > 0) {
    robots[0] = true;
    durability[0]--;
  }

  // 4. 내구도가 0인 칸의 개수 확인
  let zeroCount = 0;
  for (let i = 0; i < 2 * N; i++) {
    if (durability[i] === 0) zeroCount++;
  }

  if (zeroCount >= K) {
    break;
  }
}

console.log(step);