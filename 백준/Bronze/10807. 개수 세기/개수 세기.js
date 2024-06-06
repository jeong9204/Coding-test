const fs = require("fs");
const file = process.platform === "linux" ? "dev/stdin" : "./text.txt";
const input = fs.readFileSync(file).toString().trim().split("\n");

const t = input[0];
const arr = input[1].split(" ");
const v = input[2];

let result = 0;
for (i = 0; i < t; i++) {
  if (arr[i] === v) {
    result++;
  }
}
console.log(result);