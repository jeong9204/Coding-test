const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const angles = [];

rl.on('line', (line) => {
  angles.push(Number(line));
  
  if (angles.length === 3) {
    const sum = angles.reduce((acc, cur) => acc + cur, 0); // 각의 합 구하기

    if (sum !== 180) {
      console.log('Error'); // 합이 180이 아니면 에러
    } else if (angles[0] === 60 && angles[1] === 60 && angles[2] === 60) {
      console.log('Equilateral'); // 모두 60이면 Equilateral
    } else if (angles[0] === angles[1] || angles[1] === angles[2] || angles[0] === angles[2]) {
      console.log('Isosceles'); // 두 개가 같으면 Isosceles
    } else {
      console.log('Scalene'); // 모두 다르면 Scalene
    }

    rl.close();
  }
});
