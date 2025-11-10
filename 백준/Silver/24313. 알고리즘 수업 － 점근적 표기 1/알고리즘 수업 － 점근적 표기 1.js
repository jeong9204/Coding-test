// BOJ 24313: 점근적 표기 1
// 입력: a1 a0 / c / n0
// 출력: 조건을 만족하면 1, 아니면 0

const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
// lines: [a1, a0, c, n0]
const [a1, a0, c, n0] = lines;

let ok;

if (a1 > c) {
  // (a1 - c) > 0 이면 n이 커질수록 좌변이 증가 → 결국 양수 → 불가능
  ok = false;
} else if (a1 === c) {
  // 좌변 = a0 이므로 a0 ≤ 0 이어야 모든 n≥n0에서 성립
  ok = a0 <= 0;
} else {
  // a1 < c 이면 좌변이 n에 대해 감소 → 최악의 지점 n0만 보면 됨
  ok = (a1 * n0 + a0) <= (c * n0);
}

console.log(ok ? 1 : 0);
