// BOJ 1339: 단어 수학
// Node.js (그리디: 알파벳별 자리수 가중치 계산 후, 큰 순으로 9부터 매칭)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0].trim());
const words = [];
for (let i = 1; i <= N; i++) {
  words.push(input[i].trim());
}

// 26개의 알파벳(A~Z)에 대한 가중치 배열
const weights = new Array(26).fill(0);

// 1) 각 단어에 대해 자리수 가중치 계산
for (const word of words) {
  let place = 1; // 일의 자리부터 시작 (10^0)

  // 오른쪽 끝(일의 자리)에서부터 왼쪽으로 이동
  for (let i = word.length - 1; i >= 0; i--) {
    const ch = word[i];
    const idx = ch.charCodeAt(0) - 'A'.charCodeAt(0);
    weights[idx] += place;
    place *= 10;
  }
}

// 2) 가중치가 0이 아닌 알파벳만 모아서 정렬
const letters = [];
for (let i = 0; i < 26; i++) {
  if (weights[i] > 0) {
    letters.push({ idx: i, weight: weights[i] });
  }
}

// 가중치 내림차순 정렬
letters.sort((a, b) => b.weight - a.weight);

// 3) 9부터 차례대로 숫자를 할당하면서 합 계산
let digit = 9;
let answer = 0;

for (const letter of letters) {
  answer += letter.weight * digit;
  digit--;
}

console.log(answer.toString());
