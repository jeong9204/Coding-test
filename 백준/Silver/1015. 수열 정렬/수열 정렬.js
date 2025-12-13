// BOJ: 배열 A에 순열 P 적용해서 B를 비내림차순으로 만들기
// Node.js (JavaScript)

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/);

let idx = 0;
const N = parseInt(input[idx++], 10);

const A = new Array(N);
for (let i = 0; i < N; i++) A[i] = parseInt(input[idx++], 10);

// (값, 원래 인덱스) 쌍 만들기
const pairs = [];
for (let i = 0; i < N; i++) {
  pairs.push({ value: A[i], index: i });
}

// 값 오름차순, 값이 같으면 인덱스 오름차순
pairs.sort((p1, p2) => {
  if (p1.value !== p2.value) return p1.value - p2.value;
  return p1.index - p2.index;
});

// 정렬된 위치 k가 곧 "B에서의 자리" => P[원래인덱스] = k
const P = new Array(N);
for (let k = 0; k < N; k++) {
  P[pairs[k].index] = k;
}

console.log(P.join(" "));
