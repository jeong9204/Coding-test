'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let p = 0;
const N = Number(data[p++]);

const A = new Array(N);
for (let i = 0; i < N; i++) A[i] = Number(data[p++]);

const B = new Array(N);
for (let i = 0; i < N; i++) B[i] = Number(data[p++]);

const M = Number(data[p++]);
const C = new Array(M);
for (let i = 0; i < M; i++) C[i] = Number(data[p++]);

// 큐(0)인 자료구조의 초기 원소만 "뒤에서부터" 모아두면,
// 이 배열의 앞(head)이 '출력으로 먼저 나올 값'이 된다.
const q = [];
for (let i = N - 1; i >= 0; i--) {
  if (A[i] === 0) q.push(B[i]);
}

let head = 0;
const out = [];

for (let i = 0; i < M; i++) {
  const x = C[i];

  // ✅ push 먼저
  q.push(x);

  // ✅ 그 다음 front를 pop해서 출력 (head 포인터로 pop_front 구현)
  out.push(String(q[head++]));
}

console.log(out.join(' '));
