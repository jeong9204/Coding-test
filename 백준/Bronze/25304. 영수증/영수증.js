const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const resultSum = Number(input[0]);
const bought = Number(input[1]);
let sum = 0;

for (let i=0; i<bought; i++) {
  let tmpStr = input[i+2];
  let tmpArr = tmpStr.split(" ");
  let tmpSum = tmpArr[0] * tmpArr[1];
  sum += tmpSum;
}

resultSum === sum ? console.log("Yes") : console.log("No");