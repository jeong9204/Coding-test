// BOJ 2573 - 빙산
// 연도별로: (1) 현재 빙산 덩어리 개수 확인 -> (2) 동시에 녹임 -> year++
// 최초로 2개 이상 되면 year 출력, 전부 녹을 때까지 분리 안 되면 0

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [N, M] = input[0].trim().split(/\s+/).map(Number);

// 지도 파싱
const board = Array.from({ length: N }, (_, i) =>
  input[i + 1].trim().split(/\s+/).map(Number)
);

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 현재 빙산 덩어리(연결 요소) 개수 세기 - BFS
function countComponents() {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;

  // 큐를 배열+head 포인터로 구현 (shift() 비용 회피)
  function bfs(sr, sc) {
    const q = [[sr, sc]];
    let head = 0;
    visited[sr][sc] = true;

    while (head < q.length) {
      const [r, c] = q[head++];
      for (const [dr, dc] of DIRS) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;
        if (visited[nr][nc]) continue;
        if (board[nr][nc] === 0) continue;
        visited[nr][nc] = true;
        q.push([nr, nc]);
      }
    }
  }

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] > 0 && !visited[r][c]) {
        count++;
        if (count >= 2) return 2; // 조기 종료(2 이상만 알면 됨)
        bfs(r, c);
      }
    }
  }
  return count; // 0 또는 1
}

// 한 해를 동시에 녹이기
function meltOneYear() {
  // 각 칸이 몇 만큼 줄어드는지 계산
  const dec = Array.from({ length: N }, () => Array(M).fill(0));

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] <= 0) continue;
      let water = 0;
      for (const [dr, dc] of DIRS) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;
        if (board[nr][nc] === 0) water++;
      }
      dec[r][c] = water;
    }
  }

  // 동시에 적용
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      if (board[r][c] > 0) {
        board[r][c] = Math.max(0, board[r][c] - dec[r][c]);
      }
    }
  }
}

let year = 0;

while (true) {
  const comp = countComponents();

  if (comp >= 2) {
    console.log(year.toString());
    break;
  }
  if (comp === 0) {
    console.log('0');
    break;
  }

  meltOneYear();
  year++;
}
