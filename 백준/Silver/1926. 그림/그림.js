// 그림 (BOJ 1926 스타일 문제)
// 1로 상하좌우 연결된 덩어리(그림)의 개수와, 그 중 최대 넓이를 구하기.
// BFS(반복)로 구현하여 Node.js 재귀 한계를 피함.

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const [n, m] = input[0].trim().split(/\s+/).map(Number);

// 격자 파싱
const grid = Array.from({ length: n }, (_, i) =>
  input[i + 1].trim().split(/\s+/).map(Number)
);

const visited = Array.from({ length: n }, () => Array(m).fill(false));
const DIRS = [
  [1, 0],  // 아래
  [-1, 0], // 위
  [0, 1],  // 오른쪽
  [0, -1], // 왼쪽
];

function bfs(sr, sc) {
  let area = 0;
  // 큐를 배열로 만들고 head 포인터로 pop 비용 절약
  const q = [[sr, sc]];
  let head = 0;
  visited[sr][sc] = true;

  while (head < q.length) {
    const [r, c] = q[head++];
    area++;

    for (const [dr, dc] of DIRS) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= m) continue;
      if (visited[nr][nc]) continue;
      if (grid[nr][nc] !== 1) continue;

      visited[nr][nc] = true;
      q.push([nr, nc]);
    }
  }
  return area;
}

let count = 0;
let maxArea = 0;

for (let r = 0; r < n; r++) {
  for (let c = 0; c < m; c++) {
    if (!visited[r][c] && grid[r][c] === 1) {
      const area = bfs(r, c);
      count++;
      if (area > maxArea) maxArea = area;
    }
  }
}

console.log(count);
console.log(maxArea);
