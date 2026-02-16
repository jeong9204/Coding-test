'use strict';

const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');
let p = 0;
const L = data.length;

function nextInt() {
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let num = 0;
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num;
}

const N = nextInt();

// events: [time, delta] where delta = -1(end) or +1(start)
const events = new Array(2 * N);
let idx = 0;

for (let i = 0; i < N; i++) {
  const s = nextInt();
  const t = nextInt();
  events[idx++] = [s, 1];   // start
  events[idx++] = [t, -1];  // end
}

// 정렬: time 오름차순, time 같으면 end(-1) 먼저
events.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  return a[1] - b[1]; // -1이 +1보다 먼저
});

let cur = 0;
let ans = 0;

for (let i = 0; i < events.length; i++) {
  cur += events[i][1];
  if (cur > ans) ans = cur;
}

console.log(String(ans));
