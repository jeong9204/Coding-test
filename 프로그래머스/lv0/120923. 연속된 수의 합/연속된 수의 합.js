function solution(num, total) {
  let answer = [];
  let ans = 0;
  let cnt = 0;
  for (let i = 1; i < num; i++) {
    cnt += i;
  }
  let first = parseInt((total - cnt) / num);
  console.log(first);
  for (let i = 0; i < num; i++) {
    answer.push(first + i);
  }
  return answer;
}