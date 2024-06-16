const input = require("fs").readFileSync("/dev/stdin").toString();

let answer = "";
for (i = 1; i <= input; i++) {
    answer += "*";
    console.log(answer);
}