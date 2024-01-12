function solution(cards) {
  let answer = 0;
  const calc = (idx, cards, prev) => {
    const card = cards[idx];
    cards[idx] = 0;
    if (card === 0) return prev;
    return calc(card - 1, cards, prev + 1);
  };
  cards.forEach((card) => {
    if (card !== 0) {
      const copy1 = [...cards];
      const first = calc(card - 1, copy1, 0);
      copy1.forEach((card) => {
        if (card !== 0) {
          const copy2 = [...copy1];
          const second = calc(card - 1, copy2, 0);
          answer = Math.max(answer, first * second);
        }
      });
    }
  });
  return answer;
}