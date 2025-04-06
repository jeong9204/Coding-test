const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const N = parseInt(input[0]);
const commands = input.slice(1);

const queue = [];
let result = [];

let frontIndex = 0;

for (let i = 0; i < N; i++) {
  const [cmd, val] = commands[i].split(" ");
  
  if (cmd === "push") {
    queue.push(parseInt(val));
  } else if (cmd === "pop") {
    if (frontIndex === queue.length) {
      result.push(-1);
    } else {
      result.push(queue[frontIndex]);
      frontIndex++;
    }
  } else if (cmd === "size") {
    result.push(queue.length - frontIndex);
  } else if (cmd === "empty") {
    result.push(queue.length - frontIndex === 0 ? 1 : 0);
  } else if (cmd === "front") {
    result.push(queue.length - frontIndex === 0 ? -1 : queue[frontIndex]);
  } else if (cmd === "back") {
    result.push(queue.length - frontIndex === 0 ? -1 : queue[queue.length - 1]);
  }
}

console.log(result.join("\n"));
