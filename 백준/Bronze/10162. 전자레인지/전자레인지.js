const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const T = parseInt(line);
  const A = 300; // 5분
  const B = 60;  // 1분
  const C = 10;  // 10초

  // 10초 단위로만 조작 가능하므로 10으로 나누어 떨어지지 않으면 불가능
  if (T % 10 !== 0) {
    console.log(-1);
  } else {
    const countA = Math.floor(T / A);
    const remainderA = T % A;

    const countB = Math.floor(remainderA / B);
    const remainderB = remainderA % B;

    const countC = Math.floor(remainderB / C);

    console.log(`${countA} ${countB} ${countC}`);
  }

  rl.close();
});
