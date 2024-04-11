function solution(coin, cards) {
  const target = cards.length + 1;
  let hand = cards.splice(0, cards.length / 3); // 손에 갖고 있는 카드배열
  let keep = []; // 매 라운드마다 뽑는 카드를 기억하는 배열
  let round = 0;

  // 남은 카드가 없을 때까지 진행
  while (cards.length) {
    // 이번 라운드에 뽑은 2장을 기억한다
    const picked = cards.splice(0, 2);
    picked.forEach((e) => keep.push(e));

    // 손에 갖고 있던 것 2장으로 만들 수 있는지 확인
    const handPair = getPair(hand, target);
    // 만들 수 있으면
    if (handPair) {
      hand = hand.filter((e) => !handPair.includes(e)); // hand에서 사용한 카드 삭제
      round++; // 라운드 증가
      continue;
    }

    // 손에 카드 1개 keep 1개로 만들 수 있는지 확인
    const handKeepPair = getHandKeepPair(hand, keep, target);
    // 만들 수 있고 동전도 있다면
    if (handKeepPair && coin) {
      const [handNum, keepNum] = handKeepPair;
      hand = hand.filter((e) => e !== handNum); // hand에서 사용한 카드 삭제
      keep = keep.filter((e) => e !== keepNum); // keep에서 사용한 카드 삭제
      coin--; // keep에서 하나 구매한 동전 감소
      round++;
      continue;
    }

    // keep2개로 만들 수 있는지 확인
    const keepPair = getPair(keep, target);
    // 만들 수 있고 동전이 2개 이상이면
    if (keepPair && coin >= 2) {
      keep = keep.filter((e) => !keepPair.includes(e)); // 사용한 keep 숫자 삭제
      coin -= 2; // 사용한 2개 동전 감소
      round++;
      continue;
    }
    // 위의 3가지 방법으로 target을 만들 수 없으면 게임종료
    break;
  }
  return round + 1; // +1은 마지막 라운드를 통과했으므로 +1
}

// arr에서 2장을 골라 target을 만들 수 있는지 확인하는 함수
function getPair(arr, target) {
  for (let i = 0; i < arr.length - 1; i++) {
    const first = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      const second = arr[j];
      if (first + second === target) {
        return [first, second];
      }
    }
  }
  return null;
}

// hand에서 1장, keep에서 1장으로 target을 만들 수 있는지 확인하는 함수
function getHandKeepPair(hand, keep, target) {
  for (let i = 0; i < hand.length; i++) {
    const first = hand[i];
    for (let j = 0; j < keep.length; j++) {
      const second = keep[j];
      if (first + second === target) {
        return [first, second];
      }
    }
  }
  return null;
}