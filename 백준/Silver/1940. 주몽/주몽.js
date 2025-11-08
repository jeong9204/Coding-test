// BOJ 1940: 주몽
// Node.js (v12+ 호환) - 표준 입력으로부터 읽기

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
// input: [N, M, a1, a2, ..., aN]

const N = input[0] || 0;
const M = input[1] || 0;
const arr = input.slice(2, 2 + N);

// 예외 처리: 재료가 2개 미만이면 쌍이 없음
if (arr.length < 2) {
  console.log(0);
  process.exit(0);
}

// 1) 정렬
arr.sort((a, b) => a - b);

// 2) 투 포인터로 쌍 세기
let l = 0;
let r = arr.length - 1;
let count = 0;

while (l < r) {
  const sum = arr[l] + arr[r];

  if (sum === M) {
    count++;
    l++;
    r--;
  } else if (sum < M) {
    l++; // 합을 키우기
  } else {
    r--; // 합을 줄이기
  }
}

console.log(count);
