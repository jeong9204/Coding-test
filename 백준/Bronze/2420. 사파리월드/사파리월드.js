var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString().split(' ');
var a = input[0];
var b = input[1];
if (a < b) {
    console.log(Math.abs(b - a))
} else {
    console.log(Math.abs(a - b))
}