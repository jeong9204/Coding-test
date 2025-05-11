const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const initial = input[0].split('');
  const M = Number(input[1]);
  const commands = input.slice(2);

  const leftStack = initial; // 커서 왼쪽
  const rightStack = [];     // 커서 오른쪽

  for (let i = 0; i < M; i++) {
    const [cmd, arg] = commands[i].split(' ');

    if (cmd === 'L' && leftStack.length > 0) {
      rightStack.push(leftStack.pop());
    } else if (cmd === 'D' && rightStack.length > 0) {
      leftStack.push(rightStack.pop());
    } else if (cmd === 'B' && leftStack.length > 0) {
      leftStack.pop();
    } else if (cmd === 'P') {
      leftStack.push(arg);
    }
  }

  console.log(leftStack.concat(rightStack.reverse()).join(''));
});
