'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
const X = input[p++];

const arr = input.slice(p, p + N);

// 1) 초기 윈도우 합
let sum = 0;
for (let i = 0; i < X; i++) sum += arr[i];

let maxSum = sum;
let count = 1;

// 2) 슬라이딩
for (let i = X; i < N; i++) {
  sum += arr[i] - arr[i - X];

  if (sum > maxSum) {
    maxSum = sum;
    count = 1;
  } else if (sum === maxSum) {
    count++;
  }
}

// 3) 출력
if (maxSum === 0) {
  console.log('SAD');
} else {
  console.log(String(maxSum));
  console.log(String(count));
}
