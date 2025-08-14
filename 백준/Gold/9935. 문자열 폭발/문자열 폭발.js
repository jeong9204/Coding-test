const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line.trim());
  if (lines.length === 2) rl.close();
}).on('close', () => {
  const S = lines[0];
  const P = lines[1];

  const m = P.length;
  const last = P[m - 1];

  const stack = [];

  for (let i = 0; i < S.length; i++) {
    const ch = S[i];
    stack.push(ch);

    // 마지막 문자가 같고, 길이가 충분하면 후보 검사
    if (ch === last && stack.length >= m) {
      let match = true;
      // 스택의 끝에서 m개가 P와 같은지 확인
      for (let j = 0; j < m; j++) {
        if (stack[stack.length - m + j] !== P[j]) {
          match = false;
          break;
        }
      }
      // 완전히 일치하면 해당 구간 제거
      if (match) {
        stack.length -= m; // pop을 m번 하는 것보다 빠른 방법
      }
    }
  }

  const result = stack.join('');
  console.log(result.length ? result : 'FRULA');
});
