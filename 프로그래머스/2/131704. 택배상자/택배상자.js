function solution(order) {
  let answer = 0;
  const stack = [];
  let boxNum = 1;
  for (const idx of order) {
    let checker = false;
    while (true) {
      if (stack.length === 0) stack.push(boxNum++);
      if (idx > stack.at(-1)) stack.push(boxNum++);
      else if (idx === stack.at(-1)) {
        stack.pop();
        answer++;
        checker = true;
        break;
      } else break;
    }
    if (!checker) break;
  }
  return answer;
}