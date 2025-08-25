// 내리막 길 - 정렬 기반 Bottom-Up DP (권장 버전)
// 아이디어: 각 칸 (r,c)에서 목표까지의 경로 수 dp[r][c]를 계산한다.
// 이동은 "더 낮은 칸"으로만 가능하므로, "낮은 칸들의 dp"가 먼저 준비되어야 한다.
// => 높이를 오름차순으로 정렬해 낮은 칸부터 처리하면,
//    dp[r][c] = sum(dp[낮은 이웃]) 로 누적 가능 (DAG 위에서의 경로 수 세기)

const fs = require('fs');

const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;
const M = tokens[p++], N = tokens[p++];

const H = Array.from({ length: M }, () => Array(N));
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) H[i][j] = tokens[p++];
}

// dp[r][c] = (r,c)에서 (M-1,N-1)까지 가는 경로 수
const dp = Array.from({ length: M }, () => Array(N).fill(0));

// 목표 지점에 "도착해 있는 상태"도 1가지 경로로 친다.
dp[M - 1][N - 1] = 1;

// 모든 칸을 (높이, r, c)로 평탄화해서 높이 오름차순 정렬
const cells = [];
for (let r = 0; r < M; r++) {
  for (let c = 0; c < N; c++) {
    cells.push([H[r][c], r, c]);
  }
}
cells.sort((a, b) => a[0] - b[0]);

const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];

// 낮은 칸부터 차례대로: 현재 칸의 dp는 "더 낮은 이웃들의 dp" 합
for (const [h, r, c] of cells) {
  for (const [dr, dc] of DIRS) {
    const nr = r + dr, nc = c + dc;
    if (nr < 0 || nc < 0 || nr >= M || nc >= N) continue;
    if (H[nr][nc] < h) {
      // (r,c) -> (nr,nc)로 내려갈 수 있음
      dp[r][c] += dp[nr][nc];
    }
  }
}

// 시작점에서의 경로 수 출력
console.log(dp[0][0].toString());
