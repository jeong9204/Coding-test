// BOJ 2589: 보물섬
// Node.js - 모든 육지에서 BFS를 돌려 최장 최단거리 찾기

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [R, C] = input[0].trim().split(' ').map(Number);
const map = [];
for (let i = 1; i <= R; i++) {
  map.push(input[i].trim().split('')); // 각 줄을 문자 배열로
}

// 상하좌우 이동 벡터
const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

let answer = 0;

for (let sr = 0; sr < R; sr++) {
  for (let sc = 0; sc < C; sc++) {
    // 육지(L)에서만 BFS 시작
    if (map[sr][sc] !== 'L') continue;

    // dist 배열: -1이면 아직 방문 안 함
    const dist = Array.from({ length: R }, () => Array(C).fill(-1));
    const queue = [];
    let head = 0;

    dist[sr][sc] = 0;
    queue.push([sr, sc]);

    let localMax = 0; // 이 BFS에서의 최장 거리

    while (head < queue.length) {
      const [r, c] = queue[head++];
      const curD = dist[r][c];

      // 현재 칸까지의 거리로 localMax 갱신
      if (curD > localMax) localMax = curD;

      for (let d = 0; d < 4; d++) {
        const nr = r + dr[d];
        const nc = c + dc[d];

        // 범위 밖이면 패스
        if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
        // 바다(W)면 패스
        if (map[nr][nc] !== 'L') continue;
        // 이미 방문한 육지면 패스
        if (dist[nr][nc] !== -1) continue;

        dist[nr][nc] = curD + 1;
        queue.push([nr, nc]);
      }
    }

    // 전체 최댓값 갱신
    if (localMax > answer) answer = localMax;
  }
}

console.log(answer.toString());
