const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();

const N = Number(input);

// 카드 저장 배열
const cards = [];

// 1부터 N까지 카드 넣기
for (let i = 1; i <= N; i++) {
  cards.push(i);
}

let front = 0;
const result = [];

// 카드가 1장 남을 때까지 반복
while (cards.length - front > 1) {
  // 1) 맨 위 카드 버리기
  result.push(cards[front]);
  front++;

  // 2) 그 다음 맨 위 카드를 맨 아래로 옮기기
  cards.push(cards[front]);
  front++;
}

// 마지막 남은 카드 추가
result.push(cards[front]);

console.log(result.join(' '));