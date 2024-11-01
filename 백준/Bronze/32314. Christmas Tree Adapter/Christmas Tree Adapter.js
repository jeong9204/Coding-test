const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (inputA) => {
  const a = parseInt(inputA.trim());
  
  rl.question('', (inputWV) => {
    const [w, v] = inputWV.split(' ').map(Number);
    console.log(w / v >= a ? 1 : 0);
    rl.close();
  });
});
