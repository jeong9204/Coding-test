'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);
const board = input.slice(1).map(line => line.trim().split(''));

const visited = Array.from({ length: N }, () => Array(M).fill(false));

let count = 0;

for (let r = 0; r < N; r++) {
  for (let c = 0; c < M; c++) {
    if (visited[r][c]) continue;

    visited[r][c] = true;
    count++;

    if (board[r][c] === '-') {
      // 같은 행에서 오른쪽으로 연속된 '-' 방문 처리
      let nc = c + 1;
      while (nc < M && !visited[r][nc] && board[r][nc] === '-') {
        visited[r][nc] = true;
        nc++;
      }
    } else { // '|'
      // 같은 열에서 아래로 연속된 '|' 방문 처리
      let nr = r + 1;
      while (nr < N && !visited[nr][c] && board[nr][c] === '|') {
        visited[nr][c] = true;
        nr++;
      }
    }
  }
}

console.log(String(count));