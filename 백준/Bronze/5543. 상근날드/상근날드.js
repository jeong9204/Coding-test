const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prices = []; // 가격들을 저장할 배열

rl.on('line', (line) => {
  prices.push(Number(line)); // 입력받은 값을 숫자로 변환해서 저장
  if (prices.length === 5) { // 총 5개 입력을 받으면
    rl.close();
  }
});

rl.on('close', () => {
  // 햄버거 가격 중 가장 싼 것
  const minBurger = Math.min(prices[0], prices[1], prices[2]);
  // 음료 가격 중 가장 싼 것
  const minDrink = Math.min(prices[3], prices[4]);

  // 가장 싼 햄버거 + 가장 싼 음료 - 50원
  const cheapestSet = minBurger + minDrink - 50;

  console.log(cheapestSet); // 정답 출력
});
