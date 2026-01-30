'use strict';

const fs = require('fs');
const N = Number(fs.readFileSync(0, 'utf8').trim());

// 경우의 수 = 2^N
console.log(String(2 ** N));
