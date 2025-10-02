// 실행: node main.js < input.txt
const fs = require('fs');

// 공백(스페이스/개행) 기준으로 숫자 모두 읽기
const nums = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

// 입력 파싱
const L = nums[0];
const P = nums[1];
const reports = nums.slice(2, 7); // 기사 5개

// 상근이가 계산한 참가자 수
const real = L * P;

// 각 기사 - 실제값
const diffs = reports.map(v => v - real);

// 한 줄에 공백으로 출력
console.log(diffs.join(' '));
