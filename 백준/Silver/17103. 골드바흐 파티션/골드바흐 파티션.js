// BOJ 17103 골드바흐 파티션
// 1) maxN까지 에라토스테네스의 체
// 2) 각 N에 대해 p=2..N/2에서 prime[p] && prime[N-p] 카운트

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const T = input[idx++];
const arr = new Array(T);

let maxN = 0;
for (let t = 0; t < T; t++) {
  const n = input[idx++];
  arr[t] = n;
  if (n > maxN) maxN = n;
}

// 에라토스테네스의 체: prime[x] = 1이면 소수
const prime = new Uint8Array(maxN + 1);
prime.fill(1);
prime[0] = 0;
prime[1] = 0;

// 짝수 제거
for (let i = 4; i <= maxN; i += 2) prime[i] = 0;
// 홀수만 체
const limit = Math.floor(Math.sqrt(maxN));
for (let i = 3; i <= limit; i += 2) {
  if (prime[i] === 0) continue;
  // i*i부터 i씩 증가하며 지우기 (홀수만 처리하려면 2*i씩)
  for (let j = i * i; j <= maxN; j += i) {
    prime[j] = 0;
  }
}
// 2는 소수
if (maxN >= 2) prime[2] = 1;

let out = [];
for (let t = 0; t < T; t++) {
  const N = arr[t];
  let cnt = 0;

  // p는 2..N/2 (p <= N-p)
  for (let p = 2; p <= N / 2; p++) {
    if (prime[p] && prime[N - p]) cnt++;
  }

  out.push(String(cnt));
}

console.log(out.join('\n'));
