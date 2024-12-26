// 입력 처리
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const T = parseInt(input[0]); // 테스트 케이스 개수
const cases = input.slice(1).map(Number); // 테스트 케이스들 (n값)

// DP 배열 초기화
const dp = Array(12).fill(0); // n의 최대값은 11, 인덱스를 1-based로 사용

// 초기값 설정 (기저 사례)
dp[1] = 1; // 1을 만드는 방법: 1 (1가지)
dp[2] = 2; // 2를 만드는 방법: 1+1, 2 (2가지)
dp[3] = 4; // 3을 만드는 방법: 1+1+1, 1+2, 2+1, 3 (4가지)

// DP 점화식 적용
for (let i = 4; i <= 11; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
}

// 테스트 케이스 처리 및 출력
const results = cases.map(n => dp[n]);
console.log(results.join("\n"));
