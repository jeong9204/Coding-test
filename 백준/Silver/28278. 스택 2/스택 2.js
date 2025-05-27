const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const commands = input.slice(1);

const stack = [];
const output = [];

for (let i = 0; i < N; i++) {
  const cmd = commands[i];

  if (cmd[0] === '1') {
    // 1 X → push
    const [, x] = cmd.split(' ');
    stack.push(Number(x));
  } else if (cmd === '2') {
    // pop
    output.push(stack.length ? stack.pop() : -1);
  } else if (cmd === '3') {
    // size
    output.push(stack.length);
  } else if (cmd === '4') {
    // empty
    output.push(stack.length === 0 ? 1 : 0);
  } else if (cmd === '5') {
    // top
    output.push(stack.length ? stack[stack.length - 1] : -1);
  }
}

console.log(output.join('\n'));
