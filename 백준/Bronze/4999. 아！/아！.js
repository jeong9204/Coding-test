var fs = require('fs');
const input = fs.readFileSync("/dev/stdin").toString().split('\n');
var a = input[0];
var b = input[1];
if(a.length < b.length) {
    console.log('no')
} else {
    console.log('go')
}