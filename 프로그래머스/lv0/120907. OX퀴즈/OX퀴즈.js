function solution(quiz) {
    let b = -1;
  let answer = [];
  while (true) {
    if (b === quiz.length - 1) {
      break;
    }
    b = b + 1;
    let t = quiz[b].split(" ");
    if (t[1] === "+") {
      if (parseInt(t[0]) + parseInt(t[2]) === parseInt(t[4])) {
        answer.push("O");
      }
      if (parseInt(t[0]) + parseInt(t[2]) !== parseInt(t[4])) {
        answer.push("X");
      }
    }
    if (t[1] === "-") {
      if (parseInt(t[0]) - parseInt(t[2]) === parseInt(t[4])) {
        answer.push("O");
      }
      if (parseInt(t[0]) - parseInt(t[2]) !== parseInt(t[4])) {
        answer.push("X");
      }
    }
  }
  return answer;
}