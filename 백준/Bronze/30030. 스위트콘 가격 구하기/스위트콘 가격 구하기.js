const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const user_input = parseInt(input);

  const result = Math.floor(user_input / 11) * 10;

  console.log(result);
  rl.close();
});
