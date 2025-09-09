// BOJ 9093 단어 뒤집기 - Node.js (readline)
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let T;                 // 테스트 케이스 개수
const lines = [];      // 문장들을 담을 배열

rl.on('line', (line) => {
  if (T === undefined) {
    // 첫 줄: 테스트 케이스 개수
    T = Number(line.trim());
    if (T === 0) rl.close(); // 혹시 0이면 바로 종료
  } else {
    // 다음 줄들: 문장
    lines.push(line);        // 문장은 공백/대소문자 그대로 보존
    if (lines.length === T) rl.close();
  }
});

rl.on('close', () => {
  const out = lines.map(sentence => {
    // 1) 공백으로 단어 나누기
    // 2) 각 단어를 뒤집기
    // 3) 다시 공백으로 합치기
    return sentence
      .split(' ')
      .map(word => [...word].reverse().join('')) // 스프레드로 안전하게 문자 뒤집기
      .join(' ');
  });

  console.log(out.join('\n'));
});
