// 실행: node main.js < input.txt
const fs = require('fs');
const tok = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const N = tok[p++], M = tok[p++];

// 2D prefix sum 배열 (1-indexed), 테두리 0 패딩
const ps = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

// 입력과 동시에 누적합 채우기
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= M; c++) {
    const val = tok[p++];
    ps[r][c] = ps[r - 1][c] + ps[r][c - 1] - ps[r - 1][c - 1] + val;
  }
}

const K = tok[p++];
let out = [];
for (let q = 0; q < K; q++) {
  const i = tok[p++], j = tok[p++], x = tok[p++], y = tok[p++];
  const sum = ps[x][y] - ps[i - 1][y] - ps[x][j - 1] + ps[i - 1][j - 1];
  out.push(String(sum));
}

console.log(out.join('\n'));
