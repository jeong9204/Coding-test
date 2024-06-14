const input = require('fs').readFileSync(0).toString().trim().split("\n");
const x = Number(input[0]);
const y = Number(input[1]);

if(x < 0) {
    if(y < 0) {
        console.log(3)
    } else {
        console.log(2)
    }
} else {
    if(y < 0) {
        console.log(4)
    } else {
        console.log(1)
    }
}