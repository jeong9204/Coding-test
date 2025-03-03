const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let words = [];

rl.on('line', (line) => {
  words.push(line.trim());
  if (words.length === 5) rl.close(); // 5줄 입력 후 종료
}).on('close', () => {
  let result = '';

  // 최대 15글자까지 반복
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 5; j++) {
      if (i < words[j].length) {
        result += words[j][i]; // 세로로 읽기
      }
    }
  }

  console.log(result);
});
