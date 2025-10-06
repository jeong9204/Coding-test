// 실행: node main.js < input.txt
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = tokens[idx++];

// 보드 입력 (1-indexed 사용)
const board = Array.from({ length: N + 1 }, () => Array(N + 1).fill(1));
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= N; c++) {
    board[r][c] = tokens[idx++];
  }
}

// 방향 상수
const H = 0; // 가로
const V = 1; // 세로
const D = 2; // 대각

// dp[r][c][d] : 끝 좌표가 (r,c), 방향 d로 도달하는 경우의 수
const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => [0, 0, 0])
);

// 시작 상태: (1,1)-(1,2) 가로
// 문제에서 (1,1), (1,2)는 항상 0이라고 했지만 혹시 몰라 체크
if (board[1][1] === 0 && board[1][2] === 0) {
  dp[1][2][H] = 1;
}

// 점화: 좌상단 → 우하단으로 진행
for (let r = 1; r <= N; r++) {
  for (let c = 1; c <= N; c++) {
    if (board[r][c] === 1) continue; // 끝 좌표가 벽이면 도달 불가

    const curH = dp[r][c][H];
    const curV = dp[r][c][V];
    const curD = dp[r][c][D];

    // 1) 가로에서의 이동
    if (curH) {
      // → 가로 유지
      if (c + 1 <= N && board[r][c + 1] === 0) {
        dp[r][c + 1][H] += curH;
      }
      // ↘ 대각
      if (
        r + 1 <= N && c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        dp[r + 1][c + 1][D] += curH;
      }
    }

    // 2) 세로에서의 이동
    if (curV) {
      // ↓ 세로 유지
      if (r + 1 <= N && board[r + 1][c] === 0) {
        dp[r + 1][c][V] += curV;
      }
      // ↘ 대각
      if (
        r + 1 <= N && c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        dp[r + 1][c + 1][D] += curV;
      }
    }

    // 3) 대각에서의 이동
    if (curD) {
      // → 가로
      if (c + 1 <= N && board[r][c + 1] === 0) {
        dp[r][c + 1][H] += curD;
      }
      // ↓ 세로
      if (r + 1 <= N && board[r + 1][c] === 0) {
        dp[r + 1][c][V] += curD;
      }
      // ↘ 대각
      if (
        r + 1 <= N && c + 1 <= N &&
        board[r][c + 1] === 0 &&
        board[r + 1][c] === 0 &&
        board[r + 1][c + 1] === 0
      ) {
        dp[r + 1][c + 1][D] += curD;
      }
    }
  }
}

// 정답: (N,N)에 끝이 오는 모든 방향의 합
const ans = dp[N][N][H] + dp[N][N][V] + dp[N][N][D];
console.log(ans);
