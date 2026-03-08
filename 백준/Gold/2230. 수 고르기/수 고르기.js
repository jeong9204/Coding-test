'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];

const arr = new Array(N);
for (let i = 0; i < N; i++) {
  arr[i] = input[idx++];
}

// 1. 정렬
arr.sort((a, b) => a - b);

// 2. 투 포인터
let left = 0;
let right = 0;
let answer = Infinity;

while (left < N && right < N) {
  const diff = arr[right] - arr[left];

  if (diff < M) {
    // 차이가 부족하므로 더 큰 수를 봐야 함
    right++;
  } else {
    // diff >= M
    if (diff < answer) answer = diff;

    // 더 작은 차이로도 조건 만족 가능한지 확인
    left++;
  }

  // right가 left보다 뒤에 있어야 차이가 음수가 안 됨
  if (right < left) right = left;
}

console.log(answer);