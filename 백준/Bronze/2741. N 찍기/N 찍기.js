var fs = require('fs');
var input = fs.readFileSync('/dev/stdin').toString();
const num = Number(input);
for (let i = 1; i <= num; i++) {
    console.log(i);
}