// BOJ 10942: 팰린드롬? (N<=2000, M<=1e6)
// 전처리 O(N^2): pal[i][j] = 1 if A[i..j] is palindrome
// 질의 O(1)

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;

// 빠른 정수 파서 (공백/개행/윈도우 개행 모두 처리)
function nextInt() {
  const n = data.length;
  // skip whitespaces
  while (p < n) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let sign = 1;
  if (data[p] === '-') { sign = -1; p++; }
  let num = 0;
  while (p < n) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return sign * num;
}

const N = nextInt();
const A = new Int32Array(N + 1);
for (let i = 1; i <= N; i++) A[i] = nextInt();

const M = nextInt();

// pal을 1차원으로: idx(i,j) = i*(N+1) + j
const N1 = N + 1;
const pal = new Uint8Array(N1 * N1);

// 길이 1
for (let i = 1; i <= N; i++) pal[i * N1 + i] = 1;

// 길이 2
for (let i = 1; i < N; i++) {
  if (A[i] === A[i + 1]) pal[i * N1 + (i + 1)] = 1;
}

// 길이 3 이상
for (let len = 3; len <= N; len++) {
  for (let i = 1; i + len - 1 <= N; i++) {
    const j = i + len - 1;
    if (A[i] === A[j] && pal[(i + 1) * N1 + (j - 1)] === 1) {
      pal[i * N1 + j] = 1;
    }
  }
}

// 질의 처리
let out = '';
for (let k = 0; k < M; k++) {
  const s = nextInt();
  const e = nextInt();
  out += (pal[s * N1 + e] === 1 ? '1' : '0') + '\n';
}
process.stdout.write(out);
