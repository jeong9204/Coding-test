const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let numbers = [];

rl.question('', (n) => {
  let count = parseInt(n);
  let evenCount = 0;

  rl.on('line', (input) => {
    numbers = input.split(' ').map(Number);

    numbers.forEach(num => {
      if (num % 2 === 0) {
        evenCount++;
      }
    });

    if (evenCount > count / 2) {
      console.log('Happy');
    } else {
      console.log('Sad');
    }
    rl.close();
  });
});
