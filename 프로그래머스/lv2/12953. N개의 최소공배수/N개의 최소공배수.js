function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return parseInt(a * b / gcd(a, b));
}

function solution(arr) {
  let answer = 0;
  let stk = [];

  for (let el of arr) {
    if (!stk.length) {
      stk.push(el);
    } else {
      stk.push(lcm(stk.pop(), el));
    }
  }

  return stk[stk.length - 1];
}
