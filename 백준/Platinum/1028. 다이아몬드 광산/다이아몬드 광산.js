'use strict';
const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split('\n');
const [R, C] = lines[0].trim().split(/\s+/).map(Number);
const grid = lines.slice(1).map(s => s.trim());

function make2D(r, c) {
  const arr = new Array(r);
  for (let i = 0; i < r; i++) arr[i] = new Uint16Array(c);
  return arr;
}

const ul = make2D(R, C);
const ur = make2D(R, C);
const dl = make2D(R, C);
const dr = make2D(R, C);

// 1) ul, ur (위에서 아래로)
for (let r = 0; r < R; r++) {
  const row = grid[r];
  for (let c = 0; c < C; c++) {
    if (row.charCodeAt(c) === 49) { // '1'
      ul[r][c] = 1 + (r > 0 && c > 0 ? ul[r - 1][c - 1] : 0);
      ur[r][c] = 1 + (r > 0 && c + 1 < C ? ur[r - 1][c + 1] : 0);
    }
  }
}

// 2) dl, dr (아래에서 위로)
for (let r = R - 1; r >= 0; r--) {
  const row = grid[r];
  for (let c = 0; c < C; c++) {
    if (row.charCodeAt(c) === 49) { // '1'
      dl[r][c] = 1 + (r + 1 < R && c > 0 ? dl[r + 1][c - 1] : 0);
      dr[r][c] = 1 + (r + 1 < R && c + 1 < C ? dr[r + 1][c + 1] : 0);
    }
  }
}

// top에서 가능한 최대 size = min(dl, dr)
const topCap = make2D(R, C);
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    const a = dl[r][c], b = dr[r][c];
    topCap[r][c] = a < b ? a : b;
  }
}

let ans = 0;

// 각 칸을 bottom으로 두고 검사
for (let r = 0; r < R; r++) {
  const row = grid[r];
  for (let c = 0; c < C; c++) {
    if (row.charCodeAt(c) !== 49) continue; // '1' 아니면 skip

    const a = ul[r][c], b = ur[r][c];
    let maxBottom = a < b ? a : b;

    // 현재 ans보다 큰 것만 보면 됨
    for (let k = maxBottom; k > ans; k--) {
      const topR = r - 2 * (k - 1);
      if (topR < 0) continue; // 아직 위 꼭짓점이 격자 밖 -> 작은 k는 가능할 수 있으니 continue

      // top에서 아래로 내려가는 두 변이 k 이상이어야 함
      if (topCap[topR][c] >= k) {
        ans = k;
        break; // 이 bottom에서 더 큰 건 이미 실패했으므로 종료
      }
    }
  }
}

console.log(ans.toString());
