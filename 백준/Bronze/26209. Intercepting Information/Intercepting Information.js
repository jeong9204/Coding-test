const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const bits = input.trim().split(' ').map(Number);
  let isFail = false;

  for (let i = 0; i < 8; i++) {
    if (bits[i] === 9) {
      isFail = true;
      break;
    }
  }

  if (isFail) {
    console.log('F');
  } else {
    console.log('S');
  }

  rl.close();
});
