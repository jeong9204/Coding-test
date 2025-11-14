// BOJ 2636: 치즈
// Node.js 풀이 (BFS로 외부 공기 탐색, 매 시간 치즈 녹이기)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [R, C] = input[0].trim().split(' ').map(Number);

const board = [];
let totalCheese = 0;

for (let i = 1; i <= R; i++) {
  const row = input[i].trim().split(' ').map(Number);
  board.push(row);
  for (let j = 0; j < C; j++) {
    if (row[j] === 1) totalCheese++;
  }
}

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function bfsAndMelt() {
  // visited: 외부 공기로 이미 방문한 칸 표시
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  const queue = [];
  let head = 0;

  // (0,0)에서 시작하는 외부 공기 탐색
  visited[0][0] = true;
  queue.push([0, 0]);

  // 이번 시간에 녹일 치즈 위치들
  const meltList = [];

  while (head < queue.length) {
    const [r, c] = queue[head++];
    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];

      if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;
      if (visited[nr][nc]) continue;

      if (board[nr][nc] === 0) {
        // 이어진 외부 공기
        visited[nr][nc] = true;
        queue.push([nr, nc]);
      } else if (board[nr][nc] === 1) {
        // 외부 공기와 맞닿은 치즈 → 녹일 대상
        visited[nr][nc] = true; // 다시 처리하지 않도록 방문 표시
        meltList.push([nr, nc]);
      }
    }
  }

  // 실제로 치즈를 녹인다.
  for (const [r, c] of meltList) {
    board[r][c] = 0;
  }

  return meltList.length; // 이번 시간에 녹은 치즈 수
}

let time = 0;
let lastCheese = totalCheese;

while (totalCheese > 0) {
  lastCheese = totalCheese;         // 이번 시간 시작 시 남아있던 치즈 개수 저장
  const melted = bfsAndMelt();      // 이번 시간에 녹을 치즈 수
  totalCheese -= melted;
  time += 1;
}

console.log(time);
console.log(lastCheese);
