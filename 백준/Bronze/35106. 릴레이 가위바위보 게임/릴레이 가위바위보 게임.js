const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const total = 3 * N;

let c1 = 0, c2 = 0, c3 = 0;

for (let i = 0; i < total; i++) {
  const x = Number(input[idx++]);
  if (x === 1) c1++;
  else if (x === 2) c2++;
  else c3++;
}

// 원래는 각각 N번이어야 함
// 한 번 오류 -> 하나는 N-1, 하나는 N+1
let original = -1;
let actual = -1;

if (c1 === N - 1) original = 1;
if (c2 === N - 1) original = 2;
if (c3 === N - 1) original = 3;

if (c1 === N + 1) actual = 1;
if (c2 === N + 1) actual = 2;
if (c3 === N + 1) actual = 3;

console.log(original + '\n' + actual);
