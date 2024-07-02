let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split(" ").map((el) => Number(el) * Number(el)).reduce((past, curr) => past + curr, 0);

console.log(input % 10);