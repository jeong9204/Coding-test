// BOJ 9184 - 신나는 함수 실행
// 메모이제이션으로 w(a,b,c) 캐싱. 의미 있는 범위는 0~20.

const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

// 캐시: dp[a][b][c], 0은 "미계산" 의미 (결과는 항상 양수)
const dp = Array.from({ length: 21 }, () =>
  Array.from({ length: 21 }, () => Array(21).fill(0))
);

function w(a, b, c) {
  // 1) 아래 베이스 케이스는 캐시 범위 밖이므로 먼저 처리
  if (a <= 0 || b <= 0 || c <= 0) return 1;

  // 2) 상한 초과는 (20,20,20)으로 귀결
  if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);

  // 3) 캐시에 있으면 재사용
  if (dp[a][b][c] !== 0) return dp[a][b][c];

  // 4) 문제의 재귀식 적용
  let res;
  if (a < b && b < c) {
    res = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
  } else {
    res =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
  }

  dp[a][b][c] = res;
  return res;
}

// 입력은 (a b c) 삼중쌍을 여러 줄, 마지막은 -1 -1 -1
let out = [];
for (let i = 0; i + 2 < tokens.length; i += 3) {
  const a = tokens[i], b = tokens[i + 1], c = tokens[i + 2];
  if (a === -1 && b === -1 && c === -1) break;
  const val = w(a, b, c);
  out.push(`w(${a}, ${b}, ${c}) = ${val}`);
}

console.log(out.join('\n'));
