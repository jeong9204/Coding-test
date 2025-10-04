// BOJ 17413: 단어 뒤집기 2
// 실행: node main.js < input.txt
const fs = require('fs');

// 한 줄 입력, 끝 개행만 제거(문제 조건상 시작/끝이 공백 아님)
const S = fs.readFileSync(0, 'utf8').trimEnd();

const out = [];   // 최종 출력 버퍼
const word = [];  // 태그 밖에서 현재 단어 문자들을 쌓는 스택
let inTag = false;

// 단어 버퍼를 뒤집어 out에 밀어넣는 함수
function flushWord() {
  while (word.length) out.push(word.pop());
}

for (const ch of S) {
  if (inTag) {
    // 태그 내부: 있는 그대로 출력
    out.push(ch);
    if (ch === '>') inTag = false; // 태그 종료
  } else {
    // 태그 바깥
    if (ch === '<') {
      // 태그 시작 전에 단어가 있다면 먼저 뒤집어 출력
      flushWord();
      out.push(ch);
      inTag = true;
    } else if (ch === ' ') {
      // 단어 경계: 지금까지 단어를 뒤집어 출력하고 공백 출력
      flushWord();
      out.push(' ');
    } else {
      // 단어 구성 문자(a-z 또는 0-9): 단어 스택에 쌓기
      word.push(ch);
    }
  }
}

// 입력 종료 후, 남은 단어가 있으면 마저 뒤집어 출력
flushWord();

console.log(out.join(''));
