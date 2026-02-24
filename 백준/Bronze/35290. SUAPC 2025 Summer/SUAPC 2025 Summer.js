// BOJ 35290 - SUAPC 2025 Summer
// 입력: N(1~10)
// 출력: 해당 등수 팀이 "오답 제출만 줄여서" 더 높은 등수가 가능하면
//       "Think before submission"
//       아니면 "Solve harder problems"

'use strict';

const fs = require('fs');

const N = Number(fs.readFileSync(0, 'utf8').trim());

// 미리 계산된 정답 테이블 (1-indexed)
const canImprove = {
  1: false,
  2: true,
  3: false,
  4: false,
  5: false,
  6: true,
  7: true,
  8: true,
  9: false,
  10: false,
};

console.log(canImprove[N] ? 'Think before submission' : 'Solve harder problems');