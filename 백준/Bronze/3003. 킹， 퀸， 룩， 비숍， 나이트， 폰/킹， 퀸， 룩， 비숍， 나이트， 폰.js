let fs = require("fs");
let input = fs.readFileSync("/dev/stdin")
	.toString()
	.split(" ")
	.map((el) => Number(el));
let origin = [1, 1, 2, 2, 2, 8];
let result = origin.map((el, idx) => el - input[idx]);

console.log(result.join(' '));