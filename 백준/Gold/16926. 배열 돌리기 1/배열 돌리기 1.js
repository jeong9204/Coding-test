const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const M = Number(input[idx++]);
const R = Number(input[idx++]);

const A = Array.from({ length: N }, () => Array(M).fill(0));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    A[i][j] = Number(input[idx++]);
  }
}

const layers = Math.min(N, M) / 2;

function extractLayer(l) {
  const top = l, left = l;
  const bottom = N - 1 - l, right = M - 1 - l;
  const arr = [];

  // top row (left -> right)
  for (let c = left; c <= right; c++) arr.push(A[top][c]);
  // right col (top+1 -> bottom-1)
  for (let r = top + 1; r <= bottom - 1; r++) arr.push(A[r][right]);
  // bottom row (right -> left)
  for (let c = right; c >= left; c--) arr.push(A[bottom][c]);
  // left col (bottom-1 -> top+1)
  for (let r = bottom - 1; r >= top + 1; r--) arr.push(A[r][left]);

  return arr;
}

function fillLayer(l, arr) {
  const top = l, left = l;
  const bottom = N - 1 - l, right = M - 1 - l;
  let p = 0;

  // top row (left -> right)
  for (let c = left; c <= right; c++) A[top][c] = arr[p++];
  // right col (top+1 -> bottom-1)
  for (let r = top + 1; r <= bottom - 1; r++) A[r][right] = arr[p++];
  // bottom row (right -> left)
  for (let c = right; c >= left; c--) A[bottom][c] = arr[p++];
  // left col (bottom-1 -> top+1)
  for (let r = bottom - 1; r >= top + 1; r--) A[r][left] = arr[p++];
}

function rotateLeft(arr, k) {
  const n = arr.length;
  if (n === 0) return arr;
  k %= n;
  if (k === 0) return arr;
  // arr[(i+k)%n]를 i로 보내는 형태 => 왼쪽 회전
  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    res[i] = arr[(i + k) % n];
  }
  return res;
}

// 각 레이어 처리
for (let l = 0; l < layers; l++) {
  const ring = extractLayer(l);
  const rotated = rotateLeft(ring, R);
  fillLayer(l, rotated);
}

// 출력
let out = '';
for (let i = 0; i < N; i++) {
  out += A[i].join(' ') + '\n';
}
process.stdout.write(out);
