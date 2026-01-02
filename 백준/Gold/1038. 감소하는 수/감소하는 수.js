'use strict';
const fs = require('fs');

const N = Number(fs.readFileSync(0, 'utf8').trim());

// 감소하는 수 전부 담을 배열 (총 1023개)
const dec = [];

/**
 * 현재 만들어진 숫자 num (Number로도 충분함: 최대 9876543210)
 * 마지막 자리(lastDigit): 다음에 붙일 수 있는 숫자는 0 ~ lastDigit-1
 */
function dfs(num, lastDigit) {
  dec.push(num);

  for (let next = 0; next < lastDigit; next++) {
    // num 뒤에 next를 붙이기
    dfs(num * 10 + next, next);
  }
}

// 0~9를 시작점으로 DFS
for (let start = 0; start <= 9; start++) {
  dfs(start, start);
}

// 숫자 오름차순 정렬
dec.sort((a, b) => a - b);

// N번째가 존재하는지 확인
if (N >= dec.length) {
  console.log(-1);
} else {
  console.log(dec[N]);
}
