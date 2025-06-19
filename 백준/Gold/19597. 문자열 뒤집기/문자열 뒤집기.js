const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  let idx = 0;
  const T = Number(input[idx++]);

  for (let t = 0; t < T; t++) {
    const N = Number(input[idx++]);
    const original = [];
    const reversed = [];

    for (let i = 0; i < N; i++) {
      const s = input[idx++];
      original.push(s);
      reversed.push(s.split('').reverse().join(''));
    }

    let result = null;

    // 백트래킹 함수
    const dfs = (depth, path, prev) => {
      if (result) return; // 이미 답 찾았으면 종료
      if (depth === N) {
        result = path;
        return;
      }

      for (let pick = 0; pick <= 1; pick++) {
        const currStr = pick === 0 ? original[depth] : reversed[depth];
        if (!prev || prev <= currStr) {
          dfs(depth + 1, path + pick, currStr);
        }
      }
    };

    dfs(0, '', '');

    console.log(result);
  }
});
