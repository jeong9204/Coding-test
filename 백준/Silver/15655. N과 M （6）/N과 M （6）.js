// BOJ 15655 - N과 M (6)
// 조건: N개의 '서로 다른' 자연수 중 M개를 골라 '오름차순' 수열(조합) 전부 출력 (사전순)
// 접근: 입력 수 정렬 → 백트래킹으로 start 인덱스부터 고르기

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    const [N, M] = lines[0].split(' ').map(Number);
    const nums = lines[1].split(' ').map(Number).sort((a, b) => a - b);

    const chosen = [];
    const out = [];

    function dfs(start, depth) {
      if (depth === M) {
        out.push(chosen.join(' '));
        return;
      }
      for (let i = start; i < N; i++) {
        chosen.push(nums[i]);      // 현재 숫자 선택
        dfs(i + 1, depth + 1);     // 다음 인덱스부터 선택(오름차순 보장)
        chosen.pop();              // 되돌리기(backtrack)
      }
    }

    dfs(0, 0);
    console.log(out.join('\n'));
  });
