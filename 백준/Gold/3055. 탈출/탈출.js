// BOJ 3055: 탈출
// Node.js - 두 번의 BFS (물 퍼짐 시간 + 고슴도치 이동)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [R, C] = input[0].trim().split(' ').map(Number);
const map = [];
let startR = -1, startC = -1;
let destR = -1, destC = -1;

// 물 시작 위치들
const waterQueue = [];
let wHead = 0;

for (let i = 1; i <= R; i++) {
  const row = input[i].trim().split('');
  map.push(row);
  for (let j = 0; j < C; j++) {
    if (row[j] === 'S') {
      startR = i - 1;
      startC = j;
    } else if (row[j] === 'D') {
      destR = i - 1;
      destC = j;
    } else if (row[j] === '*') {
      // 물의 초기 위치들
      waterQueue.push([i - 1, j, 0]); // r, c, time
    }
  }
}

const INF = Number.POSITIVE_INFINITY;

// 1) 물 도착 시간 BFS
const waterTime = Array.from({ length: R }, () => Array(C).fill(INF));

while (wHead < waterQueue.length) {
  const [r, c, t] = waterQueue[wHead++];

  // 이미 더 빠른 시간에 기록되어 있으면 스킵
  if (waterTime[r][c] <= t) continue;
  waterTime[r][c] = t;

  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  for (let d = 0; d < 4; d++) {
    const nr = r + dr[d];
    const nc = c + dc[d];
    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

    // 돌/비버 굴로는 물이 퍼지지 않는다
    if (map[nr][nc] === 'X' || map[nr][nc] === 'D') continue;

    const nt = t + 1;
    if (waterTime[nr][nc] > nt) {
      waterQueue.push([nr, nc, nt]);
    }
  }
}

// 2) 고슴도치 BFS
const dist = Array.from({ length: R }, () => Array(C).fill(-1));
const hedgehogQueue = [];
let hHead = 0;

dist[startR][startC] = 0;
hedgehogQueue.push([startR, startC]);

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

let answer = null;

while (hHead < hedgehogQueue.length) {
  const [r, c] = hedgehogQueue[hHead++];
  const t = dist[r][c];

  for (let d = 0; d < 4; d++) {
    const nr = r + dr[d];
    const nc = c + dc[d];
    if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;

    const cell = map[nr][nc];

    // 돌은 못 감
    if (cell === 'X') continue;
    // 이미 방문한 곳은 스킵
    if (dist[nr][nc] !== -1) continue;

    // 비버 굴 도착
    if (cell === 'D') {
      answer = t + 1;
      // BFS라서 처음 도착이 최소 시간
      hHead = hedgehogQueue.length; // 루프 종료 유도
      break;
    }

    // 빈 칸인 경우: 물이 이미 있거나, 도착 시간에 물이 차면 안 됨
    const arriveTime = t + 1;
    if (cell === '.' || cell === 'S') {
      // waterTime[nr][nc]는 "물이 최초 도착하는 시간"
      // arriveTime < waterTime → 내가 먼저 도착, 안전
      if (arriveTime < waterTime[nr][nc]) {
        dist[nr][nc] = arriveTime;
        hedgehogQueue.push([nr, nc]);
      }
    }
  }
}

if (answer === null) {
  console.log('KAKTUS');
} else {
  console.log(answer.toString());
}
