// 실행: node main.js < input.txt
const fs = require('fs');

const N = Number(fs.readFileSync(0, 'utf8').trim());

// 1..N
const nums = Array.from({ length: N }, (_, i) => i + 1);
const used = new Array(N).fill(false);

// 현재 순열을 담을 버퍼(미리 크기 고정)
const cur = new Array(N);
const out = [];

function dfs(depth) {
  if (depth === N) {
    out.push(cur.join(' '));
    return;
    }
  // 작은 수부터 선택 → 사전순 보장
  for (let i = 0; i < N; i++) {
    if (used[i]) continue;
    used[i] = true;
    cur[depth] = nums[i];
    dfs(depth + 1);
    used[i] = false;
  }
}

dfs(0);
console.log(out.join('\n'));
