'use strict';
const fs = require('fs');

const [Ns, Ls] = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const N = Number(Ns);
const L = Number(Ls);

for (let k = L; k <= 100; k++) {
  const t = (k * (k - 1)) / 2;      // 0+1+...+(k-1)
  const x = N - t;                  // k*a = x
  if (x < 0) continue;
  if (x % k !== 0) continue;

  const a = x / k;
  if (a < 0) continue;              // 사실상 x>=0이면 이미 만족

  // 수열 출력
  const out = [];
  for (let i = 0; i < k; i++) out.push(String(a + i));
  console.log(out.join(' '));
  process.exit(0);
}

console.log('-1');
