// BOJ 15683 감시 - Node.js
// 알고리즘: 백트래킹(DFS) + 시야 시뮬레이션
// 감시된 칸은 7로 표기(원문엔 0~6만 등장하므로 충돌 없음)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', line => input.push(line.trim()));
rl.on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const board = Array.from({ length: N }, (_, i) =>
    input[1 + i].split(' ').map(Number)
  );

  // 방향: 0=↑, 1=→, 2=↓, 3=←
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];

  // CCTV 목록 수집
  const cctvs = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const v = board[y][x];
      if (1 <= v && v <= 5) cctvs.push({ y, x, type: v });
    }
  }

  // 타입별 가능한 방향 묶음
  const dirSets = {
    1: [[0], [1], [2], [3]],
    2: [[0, 2], [1, 3]],
    3: [[0, 1], [1, 2], [2, 3], [3, 0]],
    4: [[0, 1, 2], [1, 2, 3], [2, 3, 0], [3, 0, 1]],
    5: [[0, 1, 2, 3]],
  };

  const cloneBoard = b => b.map(row => row.slice());

  // 특정 CCTV가 주어진 방향들로 감시하는 영역을 표시
  function paintWatch(b, y, x, dirs) {
    for (const d of dirs) {
      let ny = y;
      let nx = x;
      while (true) {
        ny += dy[d];
        nx += dx[d];
        if (ny < 0 || ny >= N || nx < 0 || nx >= M) break;
        if (b[ny][nx] === 6) break; // 벽에서 시야 차단
        if (b[ny][nx] === 0) b[ny][nx] = 7; // 감시됨 표시
        // 1~5(CCTV)나 7(이미 감시됨)은 통과 가능
      }
    }
  }

  function countBlind(b) {
    let cnt = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (b[y][x] === 0) cnt++;
      }
    }
    return cnt;
  }

  let answer = Infinity;

  function dfs(idx, b) {
    if (idx === cctvs.length) {
      answer = Math.min(answer, countBlind(b));
      return;
    }
    const { y, x, type } = cctvs[idx];
    for (const dirs of dirSets[type]) {
      const nb = cloneBoard(b);
      paintWatch(nb, y, x, dirs);
      dfs(idx + 1, nb);
    }
  }

  dfs(0, board);
  console.log(answer);
});
