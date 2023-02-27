function solution(lottos, win_nums) {
    let maxCnt = 0;
  let lowCnt = 0;
  const win = [6, 6, 5, 4, 3, 2, 1];
  const answer = [0, 0];

  for (let i = 0; i < 6; i++) {
    if (lottos[i] === 0) {
      maxCnt++;
    }
    for (let j = 0; j < 6; j++) {
      if (lottos[i] === win_nums[j]) {
        maxCnt++;
        lowCnt++;
      }
    }
  }

  answer[0] = win[maxCnt];
  answer[1] = win[lowCnt];

  return answer;
}