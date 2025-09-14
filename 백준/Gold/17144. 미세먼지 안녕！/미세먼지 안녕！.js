// BOJ 17144 - 미세먼지 안녕! (Node.js)
// 시뮬레이션: 확산 → 공기청정기(반시계/시계 순환) 반복

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const [R, C, T] = lines[0].split(' ').map(Number);
  const board = Array.from({ length: R }, (_, i) =>
    lines[1 + i].split(' ').map(Number)
  );

  // 공기청정기 위치 찾기 (항상 첫 열, 위/아래로 인접한 두 칸)
  let upper = -1, lower = -1;
  for (let r = 0; r < R; r++) {
    if (board[r][0] === -1) {
      if (upper === -1) upper = r;
      else lower = r;
    }
  }

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const spread = (b) => {
    const next = Array.from({ length: R }, () => Array(C).fill(0));
    // 공기청정기는 그대로 표시
    next[upper][0] = -1;
    next[lower][0] = -1;

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        const val = b[r][c];
        if (val <= 0) continue; // 0이거나 -1
        const amt = Math.floor(val / 5);
        if (amt === 0) {
          next[r][c] += val;
          continue;
        }
        let cnt = 0;
        for (let k = 0; k < 4; k++) {
          const nr = r + dr[k], nc = c + dc[k];
          if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
          if (b[nr][nc] === -1) continue;
          next[nr][nc] += amt;
          cnt++;
        }
        next[r][c] += (val - amt * cnt);
      }
    }
    return next;
  };

  const purify = (b) => {
    // 위쪽: 반시계
    // 왼쪽 열 ↓
    for (let r = upper - 1; r > 0; r--) b[r][0] = b[r - 1][0];
    // 윗 행 ←
    for (let c = 0; c < C - 1; c++) b[0][c] = b[0][c + 1];
    // 오른쪽 열 ↑
    for (let r = 0; r < upper; r++) b[r][C - 1] = b[r + 1][C - 1];
    // upper 행 →
    for (let c = C - 1; c > 1; c--) b[upper][c] = b[upper][c - 1];
    b[upper][1] = 0; // 정화 공기
    b[upper][0] = -1; // 청정기 유지

    // 아래쪽: 시계
    // 왼쪽 열 ↑
    for (let r = lower + 1; r < R - 1; r++) b[r][0] = b[r + 1][0];
    // 아랫 행 ←
    for (let c = 0; c < C - 1; c++) b[R - 1][c] = b[R - 1][c + 1];
    // 오른쪽 열 ↓
    for (let r = R - 1; r > lower; r--) b[r][C - 1] = b[r - 1][C - 1];
    // lower 행 →
    for (let c = C - 1; c > 1; c--) b[lower][c] = b[lower][c - 1];
    b[lower][1] = 0; // 정화 공기
    b[lower][0] = -1; // 청정기 유지
  };

  let cur = board;
  for (let t = 0; t < T; t++) {
    cur = spread(cur);
    purify(cur);
  }

  let sum = 0;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (cur[r][c] > 0) sum += cur[r][c];
    }
  }
  console.log(sum);
});
