'use strict';

const fs = require('fs');
const n = Number(fs.readFileSync(0, 'utf8').trim());

if (n === 0) {
  console.log('0');
} else if (n === 1) {
  console.log('1');
} else {
  let a = 0n; // F(0)
  let b = 1n; // F(1)

  for (let i = 2; i <= n; i++) {
    const c = a + b; // F(i) = F(i-1) + F(i-2)
    a = b;
    b = c;
  }

  console.log(b.toString());
}
