function solution(n,a,b){
  // A와 B가 인접한 번호인 경우
  if (Math.abs(a - b) === 1 && Math.max(a, b) % 2 === 0) {
    return 1;
  }

  let answer = 0;

    while (a !== b) {
        a = Math.ceil(a/2);
        b = Math.ceil(b/2);
        answer++;
    }

    return answer;
}
