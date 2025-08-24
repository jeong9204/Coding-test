// BOJ 1439 - 뒤집기
// 아이디어: 0 그룹 수, 1 그룹 수를 세고 더 작은 쪽이 답.

const fs = require('fs');
const S = fs.readFileSync(0, 'utf8').trim();

let zeroGroups = 0;
let oneGroups = 0;

if (S.length > 0) {
  // 첫 글자 그룹 시작
  S[0] === '0' ? zeroGroups++ : oneGroups++;

  for (let i = 1; i < S.length; i++) {
    if (S[i] !== S[i - 1]) {
      // 새로운 그룹 시작
      if (S[i] === '0') zeroGroups++;
      else oneGroups++;
    }
  }
}

console.log(Math.min(zeroGroups, oneGroups));
