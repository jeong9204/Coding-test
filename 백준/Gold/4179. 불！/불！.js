// BOJ 4179 불!
// 1) 불 BFS로 각 칸의 불 도착 시간 계산
// 2) 지훈 BFS로 불보다 먼저 도착 가능한 칸만 이동, 바깥으로 나가면 탈출

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [R, C] = input[0].trim().split(' ').map(Number);
const grid = Array.from({ length: R }, (_, i) => input[i + 1].trim().split(''));

const INF = 1e9;

// fireDist: 불 도착 시간(분). 불이 처음 있는 칸은 0.
const fireDist = Array.from({ length: R }, () => new Int32Array(C).fill(INF));
// jihunDist: 지훈 도착 시간(분). 시작은 0.
const jihunDist = Array.from({ length: R }, () => new Int32Array(C).fill(-1));

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

// ---------- 큐 구현 (배열 + head 인덱스) ----------
class Queue {
  constructor(capacity) {
    this.qr = new Int32Array(capacity);
    this.qc = new Int32Array(capacity);
    this.head = 0;
    this.tail = 0;
  }
  push(r, c) {
    this.qr[this.tail] = r;
    this.qc[this.tail] = c;
    this.tail++;
  }
  pop() {
    const r = this.qr[this.head];
    const c = this.qc[this.head];
    this.head++;
    return [r, c];
  }
  get size() {
    return this.tail - this.head;
  }
}

// 최대 칸 수
const MAX = R * C;

let fireQ = new Queue(MAX);
let jihunQ = new Queue(MAX);

let sr = -1, sc = -1;

// 초기 위치들 찾기
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (grid[i][j] === 'F') {
      fireDist[i][j] = 0;
      fireQ.push(i, j);
    } else if (grid[i][j] === 'J') {
      sr = i; sc = j;
    }
  }
}

// ---------- 1) 불 BFS (멀티 소스) ----------
while (fireQ.size > 0) {
  const [r, c] = fireQ.pop();
  const t = fireDist[r][c];

  for (let k = 0; k < 4; k++) {
    const nr = r + dr[k];
    const nc = c + dc[k];

    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
    if (grid[nr][nc] === '#') continue; // 벽

    if (fireDist[nr][nc] > t + 1) {
      fireDist[nr][nc] = t + 1;
      fireQ.push(nr, nc);
    }
  }
}

// ---------- 2) 지훈 BFS ----------
jihunDist[sr][sc] = 0;
jihunQ.push(sr, sc);

while (jihunQ.size > 0) {
  const [r, c] = jihunQ.pop();
  const t = jihunDist[r][c];

  for (let k = 0; k < 4; k++) {
    const nr = r + dr[k];
    const nc = c + dc[k];
    const nt = t + 1;

    // 격자 밖이면 탈출 성공 (밖으로 한 칸 나가는 데 1분)
    if (nr < 0 || nr >= R || nc < 0 || nc >= C) {
      console.log(nt);
      process.exit(0);
    }

    if (grid[nr][nc] === '#') continue;      // 벽
    if (jihunDist[nr][nc] !== -1) continue;  // 이미 방문

    // 불보다 먼저 도착해야 안전: nt < fireDist[nr][nc]
    if (nt >= fireDist[nr][nc]) continue;

    jihunDist[nr][nc] = nt;
    jihunQ.push(nr, nc);
  }
}

console.log('IMPOSSIBLE');
