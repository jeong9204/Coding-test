const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0]);
const R = input[1].split(' ').map(Number);

let maxRadius = 0;
let sumMod = 0;

// prefix max들을 더한 값의 3으로 나눈 나머지만 관리
for (let i = 0; i < N; i++) {
  if (R[i] > maxRadius) {
    maxRadius = R[i];
  }

  sumMod = (sumMod + maxRadius) % 3;
}

if (sumMod === 0) {
  console.log('Delicious!');
} else {
  console.log('Oh My God!');
}