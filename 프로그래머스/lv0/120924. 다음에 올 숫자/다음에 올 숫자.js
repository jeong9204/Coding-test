function solution(common) {
  let answer = [];

  if (common[1] - common[0] === common[2] - common[1]) {
    let b = common[1] - common[0];
    answer = common[common.length - 1] + b;
  } else if (common[1] / common[0] === common[2] / common[1]) {
    let b = common[1] / common[0];
    answer = common[common.length - 1] * b;
  }

  return answer;
}