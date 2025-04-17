const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);
const [N, r, c] = input;

function z(n, r, c) {
  let answer = 0;
  while (n > 0) {
    const half = 2 ** (n - 1);
    const area = half * half;

    if (r < half && c < half) {
      // 1사분면
    } else if (r < half && c >= half) {
      // 2사분면
      answer += area;
      c -= half;
    } else if (r >= half && c < half) {
      // 3사분면
      answer += area * 2;
      r -= half;
    } else {
      // 4사분면
      answer += area * 3;
      r -= half;
      c -= half;
    }

    n--;
  }

  return answer;
}

console.log(z(N, r, c));
