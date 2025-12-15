'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;
const N = input[idx++];
const arr = input.slice(idx, idx + N);

// 1) 소수 판정용 에라토스테네스 체 (최대 합: 1000+1000=2000)
const MAX_SUM = 2000;
const isPrime = Array(MAX_SUM + 1).fill(true);
isPrime[0] = isPrime[1] = false;
for (let i = 2; i * i <= MAX_SUM; i++) {
  if (!isPrime[i]) continue;
  for (let j = i * i; j <= MAX_SUM; j += i) isPrime[j] = false;
}

// 2) 홀/짝 분리 (단, "첫 번째 수"가 왼쪽(L)에 오도록 방향을 잡음)
const first = arr[0];
const firstIsOdd = first % 2 === 1;

let L = []; // 왼쪽 파티션
let R = []; // 오른쪽 파티션

for (const x of arr) {
  const isOdd = x % 2 === 1;
  // first가 홀수면: L=홀수, R=짝수
  // first가 짝수면: L=짝수, R=홀수  (항상 first는 L에 속하게)
  if (firstIsOdd) {
    if (isOdd) L.push(x);
    else R.push(x);
  } else {
    if (!isOdd) L.push(x);
    else R.push(x);
  }
}

// 홀수/짝수 개수 불일치면 완전 매칭 불가
if (L.length !== R.length) {
  console.log('-1');
  process.exit(0);
}

// L에서 first(입력 첫 수)를 0번으로 맞추기
// (매칭을 "첫 수와 누구를 짝지을 수 있는지" 후보별로 강제할 거라서)
const posFirstInL = L.indexOf(first);
[L[0], L[posFirstInL]] = [L[posFirstInL], L[0]];

// 3) 인접 리스트 구성: L의 각 노드가 연결 가능한 R 인덱스들
const adj = Array.from({ length: L.length }, () => []);
for (let i = 0; i < L.length; i++) {
  for (let j = 0; j < R.length; j++) {
    if (isPrime[L[i] + R[j]]) adj[i].push(j);
  }
}

// 4) Kuhn 알고리즘(DFS)로 이분 매칭
function canPerfectMatchingWithFixedPair(fixedR) {
  // matchR[r] = 매칭된 L의 인덱스 (없으면 -1)
  const matchR = Array(R.length).fill(-1);

  // first(L[0])를 fixedR에 강제로 매칭
  matchR[fixedR] = 0;

  function dfs(l, visited) {
    for (const r of adj[l]) {
      if (r === fixedR) continue; // fixedR은 first에게 고정
      if (visited[r]) continue;
      visited[r] = true;

      if (matchR[r] === -1 || dfs(matchR[r], visited)) {
        matchR[r] = l;
        return true;
      }
    }
    return false;
  }

  // 나머지 L 노드(1..end)를 모두 매칭 시도
  for (let l = 1; l < L.length; l++) {
    const visited = Array(R.length).fill(false);
    if (!dfs(l, visited)) return false;
  }
  return true;
}

// 5) first와 연결 가능한 후보들을 검사
const answers = [];
for (let r = 0; r < R.length; r++) {
  if (!isPrime[first + R[r]]) continue; // first와 합이 소수가 아니면 후보 불가
  if (canPerfectMatchingWithFixedPair(r)) answers.push(R[r]);
}

answers.sort((a, b) => a - b);

if (answers.length === 0) console.log('-1');
else console.log(answers.join(' '));
