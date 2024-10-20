const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const num = parseInt(input, 10);

  if (check(num)) { // 7이 포함된다면
    if (num % 7 !== 0) { // 7로 나뉘지 않는다면
      console.log(2);
    } else { // 나뉜다면
      console.log(3);
    }
  } else { // 포함 안된다면
    if (num % 7 !== 0) {
      console.log(0);
    } else {
      console.log(1);
    }
  }

  rl.close();
});

function check(num) {
  return num.toString().includes('7');
}
