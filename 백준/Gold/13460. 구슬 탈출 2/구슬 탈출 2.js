// BOJ 13460 - 구슬 탈출 2
// 안전 처리:
// 1) roll에서 인덱스 경계 먼저 확인 후 셀 접근
// 2) 겹침 해소: 이동 칸수 비교 대신, '방향별 시작 좌표'로 뒤에 있던 구슬을 한 칸 물리기

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(/\s+/).map(Number);
const board = Array.from({ length: N }, (_, i) => input[i + 1].split(''));

let rx = -1, ry = -1, bx = -1, by = -1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 'R') { rx = i; ry = j; board[i][j] = '.'; }
    else if (board[i][j] === 'B') { bx = i; by = j; board[i][j] = '.'; }
  }
}

// 상, 하, 좌, 우
const DIRS = [
  [-1, 0], // UP
  [ 1, 0], // DOWN
  [ 0,-1], // LEFT
  [ 0, 1], // RIGHT
];

// 한 구슬을 (dx,dy)로 벽(#) 전 또는 구멍(O)까지 굴리기
function roll(sx, sy, dx, dy) {
  let x = sx, y = sy;
  let moved = 0;
  while (true) {
    const nx = x + dx, ny = y + dy;
    // 1) 경계 먼저 확인 (안전)
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) break;
    const cell = board[nx][ny];
    if (cell === '#') break;    // 벽이면 현재 자리에서 멈춤
    x = nx; y = ny; moved++;
    if (cell === 'O') {         // 구멍이면 즉시 종료
      return { x, y, moved, fell: true };
    }
  }
  return { x, y, moved, fell: false };
}

// 방문 집합 (문자열 키)
const visited = new Set();
function key(rx, ry, bx, by) { return `${rx},${ry},${bx},${by}`; }

// BFS 큐
const q = [];
let head = 0;
q.push({ rx, ry, bx, by, d: 0 });
visited.add(key(rx, ry, bx, by));

while (head < q.length) {
  const { rx: crx, ry: cry, bx: cbx, by: cby, d } = q[head++];

  if (d >= 10) continue; // 10번 넘으면 더 확장 X

  for (const [dx, dy] of DIRS) {
    // 기울이기 전 시작 좌표(겹침 해소 판단에 사용)
    const orx = crx, ory = cry, obx = cbx, oby = cby;

    const r = roll(crx, cry, dx, dy);
    const b = roll(cbx, cby, dx, dy);

    // 파란 구슬 빠지면 실패
    if (b.fell) continue;

    // 빨간만 빠지면 성공
    if (r.fell) {
      console.log(d + 1);
      process.exit(0);
    }

    // 같은 칸에 멈췄다면(구멍은 아님) 뒤에서 온 구슬 한 칸 물리기
    if (r.x === b.x && r.y === b.y) {
      // 방향에 따른 '뒤에 있던' 구슬 판정
      if (dx === -1 && dy === 0) {
        // 위로: 시작 row가 더 큰(아래쪽) 구슬을 한 칸 내리기
        if (orx > obx) r.x += 1; else b.x += 1;
      } else if (dx === 1 && dy === 0) {
        // 아래로: 시작 row가 더 작은(위쪽) 구슬을 한 칸 올리기
        if (orx < obx) r.x -= 1; else b.x -= 1;
      } else if (dx === 0 && dy === -1) {
        // 왼쪽: 시작 col이 더 큰(오른쪽) 구슬을 한 칸 오른쪽으로
        if (ory > oby) r.y += 1; else b.y += 1;
      } else if (dx === 0 && dy === 1) {
        // 오른쪽: 시작 col이 더 작은(왼쪽) 구슬을 한 칸 왼쪽으로
        if (ory < oby) r.y -= 1; else b.y -= 1;
      }
    }

    const k = key(r.x, r.y, b.x, b.y);
    if (!visited.has(k)) {
      visited.add(k);
      q.push({ rx: r.x, ry: r.y, bx: b.x, by: b.y, d: d + 1 });
    }
  }
}

console.log(-1);
