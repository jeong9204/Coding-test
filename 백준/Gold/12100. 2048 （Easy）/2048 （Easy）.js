// BOJ 12100 - 2048 (Easy)
// 전략: 깊이 5까지 DFS(또는 완전탐색)로 4방향 모든 이동을 시뮬레이션.
// 이동 규칙 구현의 핵심: 한 번의 이동에서 "앞에서부터"만 1회 합쳐짐(두 번 합치기 금지).

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];
const board0 = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => input[p++])
);

// 한 줄(길이 N)을 "해당 방향으로" 밀고 합치는 함수.
// line은 이동하려는 방향으로 "앞에서 뒤로" 순서가 되도록 넘겨줘야 함.
// 반환: 이동/합치기 완료된 길이 N의 새 배열.
function compressAndMerge(line) {
  const nonzero = [];
  for (let x of line) if (x !== 0) nonzero.push(x);

  const merged = [];
  for (let i = 0; i < nonzero.length; i++) {
    if (i + 1 < nonzero.length && nonzero[i] === nonzero[i + 1]) {
      merged.push(nonzero[i] * 2); // 바로 앞의 것과 합쳐짐
      i++;                        // 다음 원소는 합쳐졌으니 건너뛴다(중복 합치기 방지)
    } else {
      merged.push(nonzero[i]);
    }
  }
  // 뒤를 0으로 채워 길이 N 유지
  while (merged.length < N) merged.push(0);
  return merged;
}

// 보드를 주어진 방향으로 한 번 이동시키는 함수
// dir: 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
function move(board, dir) {
  const res = Array.from({ length: N }, () => Array(N).fill(0));

  if (dir === 2) { // LEFT
    for (let r = 0; r < N; r++) {
      const line = board[r]; // 왼쪽으로 민다고 가정하면 0..N-1 순서가 "앞"
      const merged = compressAndMerge(line);
      for (let c = 0; c < N; c++) res[r][c] = merged[c];
    }
  } else if (dir === 3) { // RIGHT
    for (let r = 0; r < N; r++) {
      const line = [];
      for (let c = N - 1; c >= 0; c--) line.push(board[r][c]); // 오른쪽이 "앞"
      const merged = compressAndMerge(line);
      for (let c = 0; c < N; c++) res[r][N - 1 - c] = merged[c];
    }
  } else if (dir === 0) { // UP
    for (let c = 0; c < N; c++) {
      const line = [];
      for (let r = 0; r < N; r++) line.push(board[r][c]); // 위쪽이 "앞"
      const merged = compressAndMerge(line);
      for (let r = 0; r < N; r++) res[r][c] = merged[r];
    }
  } else if (dir === 1) { // DOWN
    for (let c = 0; c < N; c++) {
      const line = [];
      for (let r = N - 1; r >= 0; r--) line.push(board[r][c]); // 아래쪽이 "앞"
      const merged = compressAndMerge(line);
      for (let r = 0; r < N; r++) res[N - 1 - r][c] = merged[r];
    }
  }
  return res;
}

// 보드에서 최대 타일 값
function maxTile(board) {
  let mx = 0;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] > mx) mx = board[r][c];
    }
  }
  return mx;
}

let answer = maxTile(board0);

// 깊이 5까지 모든 방향 탐색 (DFS)
function dfs(board, depth) {
  if (depth === 5) {
    const m = maxTile(board);
    if (m > answer) answer = m;
    return;
  }
  for (let d = 0; d < 4; d++) {
    const next = move(board, d);
    dfs(next, depth + 1);
  }
}

dfs(board0, 0);
console.log(answer.toString());
