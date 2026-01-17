// BOJ 11003 최솟값 찾기
// 모노톤 덱 + 빠른 입력 파싱 (split 금지)

const fs = require('fs');
const data = fs.readFileSync(0); // Buffer
let p = 0;

function skipSpaces() {
  while (p < data.length) {
    const c = data[p];
    if (c !== 10 && c !== 13 && c !== 32 && c !== 9) break; // \n \r space \t
    p++;
  }
}

function nextInt() {
  skipSpaces();
  let sign = 1;
  if (data[p] === 45) { // '-'
    sign = -1;
    p++;
  }
  let num = 0;
  while (p < data.length) {
    const c = data[p];
    if (c < 48 || c > 57) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num * sign;
}

const N = nextInt();
const L = nextInt();

// 덱을 배열 + head/tail 포인터로 구현
// 최대 N개까지 들어갈 수 있으므로 크기 N으로 잡아도 안전
const idxQ = new Int32Array(N);
const valQ = new Int32Array(N);
let head = 0;
let tail = 0;

// 출력은 너무 크니까 chunk로 나눠서 write
let out = [];
const CHUNK = 50000;

for (let i = 0; i < N; i++) {
  const x = nextInt();

  // 1) 뒤에서부터 값이 x보다 큰 것 제거 (오름차순 유지)
  while (tail > head && valQ[tail - 1] > x) {
    tail--;
  }

  // 2) 새 원소 추가
  idxQ[tail] = i;
  valQ[tail] = x;
  tail++;

  // 3) 윈도우 밖 원소 제거
  const start = i - L + 1;
  while (tail > head && idxQ[head] < start) {
    head++;
  }

  // 4) 현재 최솟값은 덱 맨 앞
  out.push(String(valQ[head]));

  if (out.length >= CHUNK) {
    process.stdout.write(out.join(' ') + ' ');
    out.length = 0;
  }
}

// 남은 출력 처리 (마지막엔 공백 깔끔하게)
if (out.length > 0) {
  process.stdout.write(out.join(' '));
}
