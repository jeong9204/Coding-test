const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let S;

rl.on('line', (line) => {
  if (!N) {
    N = parseInt(line); // 첫 줄: 팀원 수
  } else {
    S = line.trim();     // 둘째 줄: 투표 정보
    rl.close();
  }
});

rl.on('close', () => {
  // O의 개수를 센다
  const oCount = [...S].filter(c => c === 'O').length;

  // 절반 이상이면 Yes, 아니면 No
  const threshold = Math.ceil(N / 2);
  console.log(oCount >= threshold ? 'Yes' : 'No');
});
