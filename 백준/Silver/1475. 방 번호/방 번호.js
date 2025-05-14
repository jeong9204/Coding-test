const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', N => {
  const count = Array(10).fill(0); // 숫자 0~9의 등장 횟수 저장

  for (let ch of N) {
    const digit = Number(ch);
    count[digit]++;
  }

  // 6과 9는 함께 사용 가능
  const sixNineCount = count[6] + count[9];
  count[6] = count[9] = Math.ceil(sixNineCount / 2); // 나눠서 올림 처리

  // 최댓값이 필요한 세트 수
  const minSets = Math.max(...count);

  console.log(minSets);
  rl.close();
});
