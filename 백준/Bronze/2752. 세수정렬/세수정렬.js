const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', line => {
  const nums = line.split(' ').map(Number);

  // 오름차순 정렬 (숫자 기준)
  nums.sort((a, b) => a - b);

  // 공백으로 출력
  console.log(nums.join(' '));

  rl.close();
});
