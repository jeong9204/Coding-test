// BOJ 12852 - 1로 만들기 2
// Node.js: DP + 경로 복원

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const N = Number(input);

// dp[i] = i를 1로 만드는 최소 연산 횟수
const dp = new Array(N + 1).fill(0);
// prev[i] = dp[i]가 최소가 되도록 i에서 다음으로 가는 숫자
const prev = new Array(N + 1).fill(0);

dp[1] = 0; // 1은 이미 1이므로 0번 연산

for (let i = 2; i <= N; i++) {
  // 기본값: i -> i-1 연산 사용
  dp[i] = dp[i - 1] + 1;
  prev[i] = i - 1;

  // 2로 나누어 떨어질 경우
  if (i % 2 === 0) {
    const candidate = dp[i / 2] + 1;
    if (candidate < dp[i]) {
      dp[i] = candidate;
      prev[i] = i / 2;
    }
  }

  // 3으로 나누어 떨어질 경우
  if (i % 3 === 0) {
    const candidate = dp[i / 3] + 1;
    if (candidate < dp[i]) {
      dp[i] = candidate;
      prev[i] = i / 3;
    }
  }
}

// 최소 연산 횟수는 dp[N]
let result = [];
result.push(String(dp[N]));

// 경로 복원: N -> ... -> 1
const path = [];
let cur = N;
while (true) {
  path.push(cur);
  if (cur === 1) break;
  cur = prev[cur];
}

// 수열을 공백으로 이어붙여 결과에 추가
result.push(path.join(' '));

// 최종 출력
console.log(result.join('\n'));
