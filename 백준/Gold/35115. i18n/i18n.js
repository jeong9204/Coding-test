// BOJ: 약어 판별 (S -> T 가능?)
// DP: dp[i][j] = S의 i까지 처리해서 T의 j까지 만들 수 있는지

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const S = input[0].trim();
const T = input[1].trim();

const n = S.length;
const m = T.length;

// dp[i][j]를 Uint8로 저장 (0/1)
const dp = Array.from({ length: n + 1 }, () => new Uint8Array(m + 1));
dp[0][0] = 1;

function isDigit(ch) {
  const c = ch.charCodeAt(0);
  return c >= 48 && c <= 57;
}

for (let i = 0; i <= n; i++) {
  const row = dp[i];
  for (let j = 0; j <= m; j++) {
    if (row[j] === 0) continue;

    // 1) 그대로 한 글자 매칭
    if (i < n && j < m && S[i] === T[j]) {
      dp[i + 1][j + 1] = 1;
    }

    // 2) 길이 숫자로 치환 (T[j]에서 숫자 파싱)
    if (j < m && T[j] >= '1' && T[j] <= '9') {
      let val = 0;
      // 길이 L은 최대 2000 => 최대 4자리만 보면 됨
      for (let k = j; k < m && isDigit(T[k]) && (k - j) < 4; k++) {
        val = val * 10 + (T.charCodeAt(k) - 48);

        // S에서 val만큼을 치환하려면 남은 길이가 충분해야 함
        if (val > n - i) break;

        // S의 i..i+val-1 을 "val"로 바꿔서 T의 j..k까지(숫자) 매칭
        dp[i + val][k + 1] = 1;
      }
    }
  }
}

console.log(dp[n][m] ? 'Yes' : 'No');
