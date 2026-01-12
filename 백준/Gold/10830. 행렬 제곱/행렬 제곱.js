// BOJ 10830: 행렬 제곱
// Node.js - 분할정복(빠른 거듭제곱) + 행렬 곱셈
// B는 BigInt로 처리 (최대 1e11)

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
let B = BigInt(input[idx++]); // 매우 중요: BigInt

const MOD = 1000;

// 행렬 읽기 (처음부터 MOD 적용해두면 편함)
let A = Array.from({ length: N }, () => Array(N).fill(0));
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    A[i][j] = Number(input[idx++]) % MOD;
  }
}

// N×N 단위행렬(I) 만들기: I * X = X
function identity(n) {
  const I = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) I[i][i] = 1;
  return I;
}

// 행렬 곱 (X * Y) mod 1000
function multiply(X, Y) {
  const Z = Array.from({ length: N }, () => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let k = 0; k < N; k++) {
      // 이 줄이 작은 최적화: X[i][k]가 0이면 그 k는 건너뛰기 가능
      const xik = X[i][k];
      if (xik === 0) continue;

      for (let j = 0; j < N; j++) {
        Z[i][j] = (Z[i][j] + xik * Y[k][j]) % MOD;
      }
    }
  }
  return Z;
}

// 빠른 거듭제곱 (반복문)
// result = I
// while B > 0:
//   if B가 홀수면 result = result * A
//   A = A * A
//   B = B / 2
let result = identity(N);

while (B > 0n) {
  if (B % 2n === 1n) {
    result = multiply(result, A);
  }
  A = multiply(A, A);
  B = B / 2n;
}

// 출력
let out = '';
for (let i = 0; i < N; i++) {
  out += result[i].join(' ') + '\n';
}
process.stdout.write(out);
