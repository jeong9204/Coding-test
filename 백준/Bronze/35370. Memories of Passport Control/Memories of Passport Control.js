'use strict';

const fs = require('fs');

const [kStr, sStr] = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const k = Number(kStr);
const s = Number(sStr);

// k페이지 도장을 최대한 많이 쓰는 게 여행 횟수를 최소로 만든다.
const y = Math.floor(s / k);   // k페이지 도장 횟수(최대)
const x = s - k * y;           // 나머지는 1페이지 도장으로 채움

const answer = x + y;
console.log(answer);