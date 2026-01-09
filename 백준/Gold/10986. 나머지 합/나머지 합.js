// BOJ 10986: 나머지 합
// Node.js (BigInt 사용: 답이 최대 약 N*(N+1)/2로 1e12 수준까지 가능)

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
let idx = 0;

const N = Number(input[idx++]);
const M = Number(input[idx++]);

// count[r] = 지금까지 누적합 % M == r 인 개수
// N이 크므로 typed array로 빠르게
const count = new BigInt64Array(M);
count[0] = 1n; // S(0) = 0 포함

let prefixMod = 0; // 누적합 % M
let ans = 0n;

for (let i = 0; i < N; i++) {
  const a = Number(input[idx++]);

  // (prefix + a) % M
  prefixMod = (prefixMod + (a % M)) % M;

  // 이전에 같은 나머지가 count[prefixMod]번 있었다면
  // 그만큼 (이전 위치, 현재 위치) 구간이 유효함
  ans += count[prefixMod];

  // 현재 나머지 등장 횟수 증가
  count[prefixMod] += 1n;
}

console.log(ans.toString());
