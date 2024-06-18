const fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().split('\n');

for (let i = 1; i <= input[0]; i++) {
  let numbers = input[i].split(' ');

  let num1 = Number(numbers[0]);
  let num2 = Number(numbers[1]);

  console.log(num1 + num2);
}