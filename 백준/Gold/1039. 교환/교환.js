'use strict';
const fs = require('fs');

const [Nstr, Kstr] = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const K = Number(Kstr);

const len = Nstr.length;

// 자릿수가 1이면 스왑 불가
if (len === 1) {
  console.log(-1);
  process.exit(0);
}

// 한 레벨에서 만들 수 있는 다음 숫자들을 생성
function generateNextStates(s) {
  const arr = s.split('');
  const res = [];

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      // swap
      [arr[i], arr[j]] = [arr[j], arr[i]];

      // 선행 0 금지
      if (arr[0] !== '0') {
        res.push(arr.join(''));
      }

      // swap back
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return res;
}

// BFS: depth별로 가능한 숫자 집합 관리
let cur = [Nstr];
let visited = Array.from({ length: K + 1 }, () => new Set());
visited[0].add(Nstr);

for (let depth = 0; depth < K; depth++) {
  const nextSet = new Set();

  for (const s of cur) {
    const nextStates = generateNextStates(s);
    for (const ns of nextStates) {
      if (!visited[depth + 1].has(ns)) {
        visited[depth + 1].add(ns);
        nextSet.add(ns);
      }
    }
  }

  // 다음 레벨로 갈 수 있는 상태가 없으면 불가능
  if (nextSet.size === 0) {
    console.log(-1);
    process.exit(0);
  }

  cur = Array.from(nextSet);
}

// K번 수행 후 가능한 수들 중 최대값 출력
let ans = -1;
for (const s of cur) {
  // 문자열 비교로도 가능하지만, 안전하게 숫자로 비교(길이 동일)
  const v = Number(s);
  if (v > ans) ans = v;
}
console.log(ans);
