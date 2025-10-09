// 실행: node main.js < input.txt
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const [F, S, G, U, D] = input;

// S == G면 바로 종료
if (S === G) {
  console.log(0);
  process.exit(0);
}

// 거리 배열: 미방문은 -1
const dist = new Int32Array(F + 1);
dist.fill(-1);

// 큐: 최대 F개 정점 방문 → 크기 F+5면 충분
const queue = new Uint32Array(F + 5);
let head = 0, tail = 0;

// 시작
dist[S] = 0;
queue[tail++] = S;

while (head < tail) {
  const x = queue[head++];

  // 목표 도달 시 종료
  if (x === G) break;

  // 1) 위로 U층 (U > 0일 때만 유효)
  if (U > 0) {
    const nx = x + U;
    if (nx <= F && dist[nx] === -1) {
      dist[nx] = dist[x] + 1;
      queue[tail++] = nx;
    }
  }

  // 2) 아래로 D층 (D > 0일 때만 유효)
  if (D > 0) {
    const nx = x - D;
    if (nx >= 1 && dist[nx] === -1) {
      dist[nx] = dist[x] + 1;
      queue[tail++] = nx;
    }
  }
}

// 결과 출력
if (dist[G] !== -1) {
  console.log(dist[G]);
} else {
  console.log('use the stairs');
}
