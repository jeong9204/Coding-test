function solution(sequence) {
  let answer = 0;
  const dpPos = [];
  const dpNeg = [];
  sequence.forEach((s, i) => {
    if (i === 0) {
      dpPos.push(s);
      dpNeg.push(-s);
    } else if (i % 2 === 0) {
      dpPos.push(Math.max(dpPos[i - 1] + s, s));
      dpNeg.push(Math.max(dpNeg[i - 1] - s, -s));
    } else {
      dpPos.push(Math.max(dpPos[i - 1] - s, -s));
      dpNeg.push(Math.max(dpNeg[i - 1] + s, s));
    }
    answer = Math.max(answer, dpPos[i], dpNeg[i]);
  });
  return answer;
}
