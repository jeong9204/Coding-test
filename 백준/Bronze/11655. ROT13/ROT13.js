const fs = require('fs');

// 한 줄 입력
const S = fs.readFileSync(0, 'utf8').replace(/\r?\n$/, '');

// 알파벳만 찾아서 ROT13 적용, 나머지는 그대로
const ans = S.replace(/[A-Za-z]/g, ch => {
  const code = ch.charCodeAt(0);

  // 대문자 A-Z
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + 13) % 26) + 65);
  }
  // 소문자 a-z
  if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + 13) % 26) + 97);
  }
  // 알파벳 외 (문제 조건상 안 걸리지만 안전망)
  return ch;
});

console.log(ans);
