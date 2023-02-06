function solution(n) {
   let answer = 0;
  let cnt = 1;
  let check = false;
  let numstr = "";
  
  while (true) {
    check = false;

    if (answer % 3 === 0) {
      answer++;
      continue;
    }
    
    numstr = String(answer);
    if (numstr.includes("3")) {
      answer++;
      check = true;
    }
    
    if (check) continue;

    if (cnt === n) break;
    answer++;
    cnt++;

    // console.log(`answer: ${answer}`);
  }

  return answer;
}