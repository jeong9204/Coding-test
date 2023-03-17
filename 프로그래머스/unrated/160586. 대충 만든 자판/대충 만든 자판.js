function solution(keymap, targets) {
    let answer = [];
  for (let i = 0; i < targets.length; i++) {
    let target = targets[i];
    let count = 0;
    let isTrue = true;
    for (let j = 0; j < target.length; j++) {
      let key = target[j];
      let minIndex = Math.min(101, ...keymap.map(k => k.indexOf(key) + 1).filter(index => index !== 0));
      if (minIndex === 101) {
        isTrue = false;
        break;
      }
      count += minIndex;
    }
    answer.push(isTrue ? count : -1);
  }
  return answer;
}