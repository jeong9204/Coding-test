// 접미사 배열 만들기 & 정렬 (BOJ 11656 유사)
// 실행: node main.js < input.txt

const fs = require('fs');

// 문제 조건: 알파벳 소문자만, 앞뒤 공백/개행 제거해도 안전
const S = fs.readFileSync(0, 'utf8').trim();
const n = S.length;

// 1) 모든 접미사 생성
const suffixes = new Array(n);
for (let i = 0; i < n; i++) {
  suffixes[i] = S.slice(i); // i부터 끝까지의 부분문자열
}

// 2) 사전순 정렬
// 소문자만이므로 comparator 없이도 OK지만, 의도를 분명히 하기 위해 comparator 명시
suffixes.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

// 3) 출력
console.log(suffixes.join('\n'));
