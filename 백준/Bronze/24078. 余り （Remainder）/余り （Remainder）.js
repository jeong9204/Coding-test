const fs = require('fs');
const input = fs.readFileSync("./dev/stdin");
console.log(+input % 21)