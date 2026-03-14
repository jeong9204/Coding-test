'use strict';

const fs = require('fs');
const N = Number(fs.readFileSync(0, 'utf8').trim());

// 최소 이동 횟수: 2^N - 1
const count = (1n << BigInt(N)) - 1n;

let result = [];
result.push(count.toString());

// N이 20 이하일 때만 이동 과정 출력
if (N <= 20) {
  const moves = [];

  function hanoi(n, from, via, to) {
    if (n === 1) {
      moves.push(`${from} ${to}`);
      return;
    }

    hanoi(n - 1, from, to, via);
    moves.push(`${from} ${to}`);
    hanoi(n - 1, via, from, to);
  }

  hanoi(N, 1, 2, 3);
  result.push(...moves);
}

console.log(result.join('\n'));