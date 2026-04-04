const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const T = Number(input[idx++]);
const n = Number(input[idx++]);
const A = input[idx++].split(' ').map(Number);
const m = Number(input[idx++]);
const B = input[idx++].split(' ').map(Number);

// 모든 부배열 합 구하는 함수
function getSubarraySums(arr) {
  const result = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    let sum = 0;
    for (let j = i; j < len; j++) {
      sum += arr[j];
      result.push(sum);
    }
  }

  return result;
}

// lower bound: target 이상이 처음 나오는 위치
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

// upper bound: target 초과가 처음 나오는 위치
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

const subA = getSubarraySums(A);
const subB = getSubarraySums(B);

subB.sort((a, b) => a - b);

let answer = 0;

for (const sumA of subA) {
  const target = T - sumA;
  const left = lowerBound(subB, target);
  const right = upperBound(subB, target);
  answer += (right - left);
}

console.log(answer.toString());