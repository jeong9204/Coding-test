// BOJ 10797 - 10부제
// 날짜의 일의 자리와 5대 자동차 번호의 일의 자리를 비교하여
// 일치하는(=위반하는) 차량 수를 출력

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    const day = parseInt(lines[0], 10);                 // 날짜의 일의 자리
    const cars = lines[1].split(/\s+/).map(Number);     // 5대 차량 번호의 일의 자리

    // 위반 차량 = 날짜와 끝자리가 같은 차
    let count = 0;
    for (const x of cars) {
      if (x === day) count++;
    }

    console.log(count.toString());
  });
