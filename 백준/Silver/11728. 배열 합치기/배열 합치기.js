// BOJ 11728 - 배열 합치기
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/); // 빠른 토큰화

let p = 0;
const N = +tokens[p++], M = +tokens[p++];

// 메모리를 아끼기 위해 TypedArray로 담음 (값 범위는 int32에 충분)
const A = new Int32Array(N);
const B = new Int32Array(M);

for (let i = 0; i < N; i++) A[i] = +tokens[p++];
for (let j = 0; j < M; j++) B[j] = +tokens[p++];

// 투 포인터 머지
let i = 0, j = 0;
const CHUNK = 200000;           // 큰 출력에서 메모리 피크 방지용
let buf = [];
let out = '';

while (i < N && j < M) {
  if (A[i] <= B[j]) {
    buf.push(String(A[i++]));   // 문자열로 저장해 공백 join
  } else {
    buf.push(String(B[j++]));
  }
  if (buf.length >= CHUNK) {
    out += buf.join(' ') + ' ';
    buf.length = 0;             // flush
  }
}

// 남은 것들 처리
while (i < N) {
  buf.push(String(A[i++]));
  if (buf.length >= CHUNK) {
    out += buf.join(' ') + ' ';
    buf.length = 0;
  }
}
while (j < M) {
  buf.push(String(B[j++]));
  if (buf.length >= CHUNK) {
    out += buf.join(' ') + ' ';
    buf.length = 0;
  }
}

// 마지막 남은 버퍼 플러시
if (buf.length) out += buf.join(' ');

// 맨 끝에 공백이 있을 수 있으니 trim
console.log(out.trim());
