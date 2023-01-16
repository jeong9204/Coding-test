function solution(balls, share) {
    let num = balls;
  let deno = share;

  for (let i = 1; i < share; i++) {
    num *= balls - i;
    deno *= share - i;
  }
  return num / deno;
}

