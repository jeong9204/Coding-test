const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const inputs = input.split(' ').map(Number);
  const s1 = inputs[0];
  const s2 = inputs[1];

  if (s1 >= s2 / 2) {
    console.log('E');
  } else {
    console.log('H');
  }

  rl.close();
});
