const fs = require('fs');

// 입력: 두 줄짜리 문자열
const [A, B] = fs.readFileSync(0, 'utf8').trim().split('\n');

const n = A.length;
const m = B.length;

// dp[i][j] = A의 앞 i글자와 B의 앞 j글자의 LCS "길이"
const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

// 1) DP 테이블 채우기 (LCS 길이 계산)
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (A[i - 1] === B[j - 1]) {
      // 마지막 글자가 같으면, 그 글자를 공통으로 사용 가능
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      // 다르면 둘 중 더 긴 쪽 선택
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

// 2) LCS 실제 문자열 복원 (역추적)
let i = n;
let j = m;
const resultChars = [];

while (i > 0 && j > 0) {
  if (A[i - 1] === B[j - 1]) {
    // 이 글자는 LCS 일부다!
    resultChars.push(A[i - 1]);
    i--;
    j--;
  } else {
    // 어디서 왔는지 비교 후 그쪽으로 이동
    if (dp[i - 1][j] === dp[i][j]) {
      i--;
    } else {
      j--;
    }
  }
}

// resultChars는 뒤집혀 있으므로 정방향으로
const lcsStr = resultChars.reverse().join('');

// 출력
console.log(dp[n][m]); // LCS 길이

if (dp[n][m] > 0) {
  console.log(lcsStr);
}
