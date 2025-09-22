// BOJ 10819 - 차이를 최대로
// 전략: 모든 순열을 DFS로 생성하며 인접 절댓값 합을 부분 누적.
// 중복 값 대비: 정렬 후 "같은 값이 직전과 같고 직전 미사용이면 스킵".

const fs = require('fs');

const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const N = tokens[0];
const arr = tokens.slice(1, 1 + N).sort((a, b) => a - b);

const used = Array(N).fill(false);
let best = -Infinity;

function dfs(depth, prevVal, sumSoFar) {
  if (depth === N) {
    if (sumSoFar > best) best = sumSoFar;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (used[i]) continue;
    // 중복 스킵: 같은 값이 바로 앞에 있고 그 앞 값이 아직 선택되지 않았다면 건너뛰기
    if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1]) continue;

    used[i] = true;
    const nextSum =
      depth === 0 ? sumSoFar : sumSoFar + Math.abs(prevVal - arr[i]);
    dfs(depth + 1, arr[i], nextSum);
    used[i] = false;
  }
}

dfs(0, 0, 0);
console.log(String(best));
