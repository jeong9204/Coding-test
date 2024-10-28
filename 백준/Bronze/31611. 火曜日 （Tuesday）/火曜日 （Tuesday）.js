const fs = require('fs');
const input = parseInt(fs.readFileSync('/dev/stdin').toString().trim(), 10);

if (input % 7 === 2) {
    console.log(1);
} else {
    console.log(0);
}
