const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력 파싱
const [n, m] = input[0].split(' ').map(Number);
const map = input.slice(1).map(row => row.split(' ').map(Number));

// 방향 벡터: 상하좌우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 거리 배열 초기화 (-1: 도달 불가능 표시용, 0: 출발점 또는 벽)
const dist = Array.from({ length: n }, () => Array(m).fill(-1));

let startX = -1, startY = -1;

// 목표지점(2) 찾기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 2) {
      startX = i;
      startY = j;
    }
    if (map[i][j] === 0) {
      dist[i][j] = 0; // 벽은 그대로 0으로 표시
    }
  }
}

// BFS 시작
const queue = [];
queue.push([startX, startY]);
dist[startX][startY] = 0;

while (queue.length > 0) {
  const [x, y] = queue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 범위 체크
    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;

    // 갈 수 있는 땅(1)이고 아직 방문 안한 곳만
    if (map[nx][ny] === 1 && dist[nx][ny] === -1) {
      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

// 출력
let output = '';
for (let i = 0; i < n; i++) {
  output += dist[i].join(' ') + '\n';
}
console.log(output.trim());
