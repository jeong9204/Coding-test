// 실행: node main.js < input.txt
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const N = parseInt(tokens[idx++], 10);

// 학생 정보 배열
const students = new Array(N);
for (let i = 0; i < N; i++) {
  const name = tokens[idx++];                 // 이름: 알파벳 대소문자
  const kor  = parseInt(tokens[idx++], 10);   // 국어
  const eng  = parseInt(tokens[idx++], 10);   // 영어
  const math = parseInt(tokens[idx++], 10);   // 수학
  students[i] = { name, kor, eng, math };
}

// 정렬 기준:
// 1) 국어 내림차순
// 2) 영어 오름차순
// 3) 수학 내림차순
// 4) 이름 사전순 오름차순 (ASCII: 대문자 < 소문자)
students.sort((a, b) => {
  if (a.kor !== b.kor) return b.kor - a.kor;
  if (a.eng !== b.eng) return a.eng - b.eng;
  if (a.math !== b.math) return b.math - a.math;
  // 이름 비교는 localeCompare 대신 ASCII 비교가 안전
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
});

// 출력: 이름만
let out = '';
for (let i = 0; i < N; i++) {
  out += students[i].name + (i + 1 === N ? '' : '\n');
}
console.log(out);
