const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (line) => {
  if (line === '0') {
    rl.close(); // 0이 입력되면 종료
    return;
  }

  const reversed = line.split('').reverse().join(''); // 문자열 뒤집기
  console.log(line === reversed ? 'yes' : 'no');
});
