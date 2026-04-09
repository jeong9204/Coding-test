const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M, K] = input[0].split(' ').map(Number);
const grid = input.slice(1, N + 1);

const NM = N * M;
const maxStates = NM * (K + 1);

// visited[state] = 1 이면 방문
const visited = new Uint8Array(maxStates);

// 큐도 TypedArray로 구현
const queue = new Int32Array(maxStates);
let head = 0;
let tail = 0;

// 시작 상태: (0, 0, 0)
const startState = 0; // broken=0, pos=0
queue[tail++] = startState;
visited[startState] = 1;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let distance = 1;

while (head < tail) {
  const currentLevelSize = tail - head;

  for (let s = 0; s < currentLevelSize; s++) {
    const state = queue[head++];

    const broken = Math.floor(state / NM);
    const pos = state % NM;
    const x = Math.floor(pos / M);
    const y = pos % M;

    if (x === N - 1 && y === M - 1) {
      console.log(distance);
      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      const nextPos = nx * M + ny;
      const cell = grid[nx][ny];

      // 빈 칸 이동
      if (cell === '0') {
        const nextState = broken * NM + nextPos;
        if (!visited[nextState]) {
          visited[nextState] = 1;
          queue[tail++] = nextState;
        }
      }
      // 벽 부수고 이동
      else if (broken < K) {
        const nextState = (broken + 1) * NM + nextPos;
        if (!visited[nextState]) {
          visited[nextState] = 1;
          queue[tail++] = nextState;
        }
      }
    }
  }

  distance++;
}

console.log(-1);