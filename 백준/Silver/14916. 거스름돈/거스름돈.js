'use strict';

const fs = require('fs');
const n = Number(fs.readFileSync(0, 'utf8').trim());

let a = Math.floor(n / 5); // 5원 동전 개수 최대부터 시작
let answer = -1;

while (a >= 0) {
  const rem = n - 5 * a;
  if (rem % 2 === 0) {
    const b = rem / 2;
    answer = a + b;
    break;
  }
  a--;
}

console.log(String(answer));
