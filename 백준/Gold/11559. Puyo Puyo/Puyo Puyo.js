'use strict';

const fs = require('fs');

const grid = fs.readFileSync(0, 'utf8').trim().split('\n').map(line => line.trim().split(''));
const H = 12;
const W = 6;

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function inRange(r, c) {
  return r >= 0 && r < H && c >= 0 && c < W;
}

// 1) 터질 그룹을 찾아서 표시하고, 실제로 터졌는지 반환
function popGroups() {
  const visited = Array.from({ length: H }, () => Array(W).fill(false));
  const toPop = []; // 터질 좌표들을 모아둠

  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      if (grid[r][c] === '.' || visited[r][c]) continue;

      const color = grid[r][c];
      const q = [[r, c]];
      visited[r][c] = true;

      const group = [[r, c]];
      let head = 0;

      // BFS로 같은 색 그룹 모으기
      while (head < q.length) {
        const [cr, cc] = q[head++];

        for (let k = 0; k < 4; k++) {
          const nr = cr + dr[k];
          const nc = cc + dc[k];
          if (!inRange(nr, nc)) continue;
          if (visited[nr][nc]) continue;
          if (grid[nr][nc] !== color) continue;

          visited[nr][nc] = true;
          q.push([nr, nc]);
          group.push([nr, nc]);
        }
      }

      // 그룹 크기가 4 이상이면 터질 후보로 등록
      if (group.length >= 4) {
        for (const cell of group) toPop.push(cell);
      }
    }
  }

  if (toPop.length === 0) return false;

  // 2) 동시에 터뜨리기
  for (const [r, c] of toPop) {
    grid[r][c] = '.';
  }

  return true;
}

// 3) 중력 적용
function applyGravity() {
  for (let c = 0; c < W; c++) {
    const stack = [];
    // 아래->위로 뿌요만 모으기
    for (let r = H - 1; r >= 0; r--) {
      if (grid[r][c] !== '.') stack.push(grid[r][c]);
    }

    // 아래부터 채우고 나머지는 '.'
    let r = H - 1;
    for (const puyo of stack) {
      grid[r][c] = puyo;
      r--;
    }
    while (r >= 0) {
      grid[r][c] = '.';
      r--;
    }
  }
}

// 메인 시뮬레이션
let chain = 0;

while (true) {
  const popped = popGroups();
  if (!popped) break;
  applyGravity();
  chain++;
}

console.log(String(chain));
