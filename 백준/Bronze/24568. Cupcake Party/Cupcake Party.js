var fs = require('fs');
var input = fs. readFileSync('/dev/stdin').toString().trim().split('\n');
var r = input [0];
var s = input [1];
console.log (8 * r + 3 * s - 28);