// N과 M (12) - 중복 허용 + 비내림차순 + 사전순 + 중복 수열 금지
// 입력 예)
// 4 2
// 9 7 9 1

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  const [N, M] = lines[0].split(' ').map(Number);
  const nums = lines[1].split(' ').map(Number);

  // 1) 정렬 + 중복 제거
  const unique = Array.from(new Set(nums)).sort((a, b) => a - b);
  const U = unique.length;

  const path = [];
  const out = [];

  function dfs(depth, startIdx) {
    if (depth === M) {
      out.push(path.join(' '));
      return;
    }
    for (let i = startIdx; i < U; i++) {
      path.push(unique[i]);     // 현재 값 선택
      dfs(depth + 1, i);        // i를 그대로 넘겨 '같은 값 재사용' + '비내림차순'
      path.pop();               // 백트래킹
    }
  }

  dfs(0, 0);
  console.log(out.join('\n'));
});
