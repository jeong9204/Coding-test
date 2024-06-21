const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const TESTCASE = input.shift();
let answer = "";
for (let i = 0; i < TESTCASE; i++) {
  const [num1, num2] = input[i].split(" ").map((item) => +item);
  answer += num1 + num2 + "\n";
}
console.log(answer);