const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  if (!global.N) {
    [global.N, global.M] = line.split(' ').map(Number);
    global.result = [];
    dfs(1, []);  // 백트래킹 시작
    console.log(global.result.join('\n'));
    rl.close();
  }
});

function dfs(start, sequence) {
  if (sequence.length === global.M) {
    global.result.push(sequence.join(' '));  // 결과 저장
    return;
  }

  for (let i = start; i <= global.N; i++) {
    dfs(i + 1, [...sequence, i]);  // 현재 숫자를 추가하고 다음 숫자로 진행
  }
}
