const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const heart = [
  " @@@   @@@ ",
  "@   @ @   @",
  "@    @    @",
  "@         @",
  " @       @ ",
  "  @     @  ",
  "   @   @   ",
  "    @ @    ",
  "     @     "
];

rl.question('', (n) => {
  n = parseInt(n); // 입력받은 값을 정수로 변환
  let result = '';

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < heart.length; j++) {
      result += heart[j] + '\n';
    }
  }

  console.log(result);
  rl.close();
});
