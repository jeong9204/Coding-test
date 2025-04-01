const readline = require('readline');

// readline 인터페이스를 생성해서 표준 입력을 받아와
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false // 터미널 모드 비활성화 (줄 끝 입력 기다림 없이 처리)
});

const lines = []; // 입력 받은 모든 줄을 저장할 배열

rl.on('line', (line) => {
  lines.push(line); // 한 줄씩 입력 받아 저장
}).on('close', () => {
  // 입력이 끝났을 때(lines가 다 들어왔을 때) 출력
  lines.forEach((line) => console.log(line));
});
