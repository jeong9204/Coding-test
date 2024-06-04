const a = require("fs").readFileSync("/dev/stdin").toString();
const num = +a

for(let i = 1; i<=9; i++) {
    console.log(`${num} * ${i} = ${a * i}`);
}