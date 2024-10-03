const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (input) => {
  const [numCoins, priceChoco] = input.split(' ').map(Number);
  
  const moneyTotal = 100 * numCoins;

  if (moneyTotal >= priceChoco) {
    console.log('Yes');
  } else {
    console.log('No');
  }

  rl.close();
});
