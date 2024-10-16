const [[N], ...R] = require('fs')
	.readFileSync('./dev/stdin')
	.toString()
	.trim()
	.split('\n')
	.map((v) => v.split(' ').map(Number));

console.log(R.map((v) => v[0] * (v[2] - 1) + v[1]).join('\n'));