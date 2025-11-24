// BOJ 1302: 베스트셀러
// Node.js 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0].trim());

// 제목별 판매 횟수를 저장할 객체
const counts = {};

for (let i = 1; i <= N; i++) {
  const title = input[i].trim(); // 제목 (소문자 문자열)
  if (counts[title] === undefined) {
    counts[title] = 1;
  } else {
    counts[title]++;
  }
}

// 최대로 많이 팔린 책 제목 + 사전순 tie-break
let bestTitle = null;
let bestCount = 0;

for (const [title, count] of Object.entries(counts)) {
  if (count > bestCount) {
    bestCount = count;
    bestTitle = title;
  } else if (count === bestCount) {
    // 현재 최대 판매량과 같다면 사전순으로 비교
    if (bestTitle === null || title < bestTitle) {
      bestTitle = title;
    }
  }
}

console.log(bestTitle);
