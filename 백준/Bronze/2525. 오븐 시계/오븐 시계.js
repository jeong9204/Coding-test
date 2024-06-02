var fs = require('fs');
const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

let a = parseInt(input[0].split(' ')[0]);
let b = parseInt(input[0].split(' ')[1]);
let c = parseInt(input[1]);

let H = 0;
let M = 0;

H = Math.floor((a * 60 + b + c) / 60);
M = (a * 60 + b + c) % 60;
if (H >= 24) {
  H -= 24;
}
console.log(`${H} ${M}`);