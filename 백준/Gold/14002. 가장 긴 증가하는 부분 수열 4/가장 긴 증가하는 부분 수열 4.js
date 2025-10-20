// BOJ 14002 - 가장 긴 증가하는 부분 수열 4
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
const A = input.slice(p, p + N);

// 이진 탐색: lower_bound (첫 번째로 >= x 인 위치)
function lowerBound(arr, x) {
  let lo = 0, hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] >= x) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}

// tailsValues[len] = 길이 len+1 끝값 최소
// tailsIndex[len]  = 그 끝값을 만든 '원본 인덱스'
const tailsValues = [];
const tailsIndex = [];
const prev = new Array(N).fill(-1); // 복원용: i 앞에 오는 인덱스

for (let i = 0; i < N; i++) {
  const x = A[i];
  const pos = lowerBound(tailsValues, x); // 엄격 증가이므로 >= 사용

  if (pos > 0) prev[i] = tailsIndex[pos - 1];

  if (pos === tailsValues.length) {
    tailsValues.push(x);
    tailsIndex.push(i);
  } else {
    tailsValues[pos] = x;
    tailsIndex[pos] = i;
  }
}

// 길이와 실제 수열 복원
const L = tailsValues.length;
const lis = new Array(L);
let idx = tailsIndex[L - 1];
for (let k = L - 1; k >= 0; k--) {
  lis[k] = A[idx];
  idx = prev[idx];
}

// 출력
let out = '';
out += L + '\n';
out += lis.join(' ') + '\n';
console.log(out);
