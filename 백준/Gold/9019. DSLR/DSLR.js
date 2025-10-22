// BOJ 9019 - DSLR
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const tok = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;
const T = tok[p++];

let outputs = [];

for (let tc = 0; tc < T; tc++) {
  const A = tok[p++], B = tok[p++];

  // 방문·이전·연산 기록
  const visited = new Uint8Array(10000);
  const prev = new Int32Array(10000);
  const op = new Uint16Array(10000); // 'D','S','L','R'를 코드로 저장 (문자코드도 가능)
  for (let i = 0; i < 10000; i++) prev[i] = -1;

  // 간단 큐 구현
  const q = new Int32Array(10000);
  let head = 0, tail = 0;

  visited[A] = 1;
  q[tail++] = A;

  // BFS
  while (head < tail && !visited[B]) {
    const cur = q[head++];

    // D
    let nxt = (cur << 1) % 10000;
    if (!visited[nxt]) {
      visited[nxt] = 1;
      prev[nxt] = cur;
      op[nxt] = 68; // 'D'.charCodeAt(0) === 68
      q[tail++] = nxt;
      if (nxt === B) break;
    }

    // S
    nxt = (cur === 0 ? 9999 : cur - 1);
    if (!visited[nxt]) {
      visited[nxt] = 1;
      prev[nxt] = cur;
      op[nxt] = 83; // 'S'
      q[tail++] = nxt;
      if (nxt === B) break;
    }

    // L : abcd -> bcda
    nxt = ((cur % 1000) * 10) + Math.floor(cur / 1000);
    if (!visited[nxt]) {
      visited[nxt] = 1;
      prev[nxt] = cur;
      op[nxt] = 76; // 'L'
      q[tail++] = nxt;
      if (nxt === B) break;
    }

    // R : abcd -> dabc
    nxt = Math.floor(cur / 10) + (cur % 10) * 1000;
    if (!visited[nxt]) {
      visited[nxt] = 1;
      prev[nxt] = cur;
      op[nxt] = 82; // 'R'
      q[tail++] = nxt;
      if (nxt === B) break;
    }
  }

  // 경로 복원
  let cur = B;
  const path = [];
  while (cur !== A) {
    path.push(String.fromCharCode(op[cur]));
    cur = prev[cur];
  }
  path.reverse();
  outputs.push(path.join(''));
}

console.log(outputs.join('\n'));
