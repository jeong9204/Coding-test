const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const N = Number(input[0]);

// 최대 N개가 들어갈 수 있으니, 양쪽으로 여유 있게 2N+5
const size = 2 * N + 5;
const deque = new Int32Array(size);

let head = N; // 가운데에서 시작
let tail = N; // [head, tail) 구간이 덱

let out = [];
let outIdx = 0;

for (let i = 1; i <= N; i++) {
  const line = input[i];
  const cmd = line.charCodeAt(0) - 48; // '1'~'8'이라 한 자리

  if (cmd === 1 || cmd === 2) {
    // "1 X" or "2 X"
    // split보다 빠르게 파싱: 공백 뒤 숫자만 뽑기
    let x = 0;
    for (let j = 2; j < line.length; j++) {
      x = x * 10 + (line.charCodeAt(j) - 48);
    }
    if (cmd === 1) {
      deque[--head] = x;
    } else {
      deque[tail++] = x;
    }
  } else if (cmd === 3) {
    if (head === tail) out[outIdx++] = '-1';
    else out[outIdx++] = String(deque[head++]);
  } else if (cmd === 4) {
    if (head === tail) out[outIdx++] = '-1';
    else out[outIdx++] = String(deque[--tail]);
  } else if (cmd === 5) {
    out[outIdx++] = String(tail - head);
  } else if (cmd === 6) {
    out[outIdx++] = (head === tail) ? '1' : '0';
  } else if (cmd === 7) {
    if (head === tail) out[outIdx++] = '-1';
    else out[outIdx++] = String(deque[head]);
  } else if (cmd === 8) {
    if (head === tail) out[outIdx++] = '-1';
    else out[outIdx++] = String(deque[tail - 1]);
  }
}

process.stdout.write(out.join('\n'));
