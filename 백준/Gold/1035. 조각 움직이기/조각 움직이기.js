// BOJ 16932 류가 아니라, 5x5 조각 연결 최소 이동 문제(BOJ 1035 "조각 움직이기") 풀이
// Node.js (fs.readFileSync(0, 'utf8')) 템플릿

'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trimEnd().split('\n');
const board = input.map(line => line.trim());

const dr = [-1, 1, 0, 0];
const dc = [0, 0, -1, 1];

function idx(r, c) {
  return r * 5 + c;
}
function inRange(r, c) {
  return 0 <= r && r < 5 && 0 <= c && c < 5;
}

// 1) 초기 조각 위치 수집
const pieces = [];
for (let r = 0; r < 5; r++) {
  for (let c = 0; c < 5; c++) {
    if (board[r][c] === '*') pieces.push([r, c]);
  }
}
const k = pieces.length;

// popcount (25비트라 32bit 정수로 충분)
function popcount(x) {
  // Brian Kernighan
  let cnt = 0;
  while (x) {
    x &= (x - 1);
    cnt++;
  }
  return cnt;
}

// 2) "연결된 집합" 마스크 생성 (크기 1~5)
function generateConnectedMasksUpTo5() {
  const setsBySize = Array.from({ length: 6 }, () => []);
  const visitedBySize = Array.from({ length: 6 }, () => new Set());

  // size=1 초기화
  for (let p = 0; p < 25; p++) {
    const m = (1 << p);
    setsBySize[1].push(m);
    visitedBySize[1].add(m);
  }

  // size s -> s+1 로 확장 (인접칸 하나 추가)
  for (let s = 1; s < 5; s++) {
    for (const mask of setsBySize[s]) {
      // mask에 포함된 모든 칸을 돌면서, 인접칸을 추가해 새 마스크 만들기
      for (let p = 0; p < 25; p++) {
        if (((mask >> p) & 1) === 0) continue;
        const r = Math.floor(p / 5);
        const c = p % 5;

        for (let d = 0; d < 4; d++) {
          const nr = r + dr[d];
          const nc = c + dc[d];
          if (!inRange(nr, nc)) continue;
          const np = idx(nr, nc);
          if (((mask >> np) & 1) === 1) continue;

          const nmask = mask | (1 << np);
          if (!visitedBySize[s + 1].has(nmask)) {
            visitedBySize[s + 1].add(nmask);
            setsBySize[s + 1].push(nmask);
          }
        }
      }
    }
  }

  return setsBySize;
}

const connectedMasks = generateConnectedMasksUpTo5()[k];

// 3) 거리 미리 계산: dist[i][cellIndex] = i번째 조각이 cellIndex로 가는 맨해튼거리
const dist = Array.from({ length: k }, () => Array(25).fill(0));
for (let i = 0; i < k; i++) {
  const [sr, sc] = pieces[i];
  for (let p = 0; p < 25; p++) {
    const tr = Math.floor(p / 5);
    const tc = p % 5;
    dist[i][p] = Math.abs(sr - tr) + Math.abs(sc - tc);
  }
}

// 4) 각 연결 마스크에 대해 최소 매칭 비용 계산
let answer = Infinity;

for (const mask of connectedMasks) {
  // 마스크에 포함된 칸 인덱스 목록
  const targets = [];
  for (let p = 0; p < 25; p++) {
    if (((mask >> p) & 1) === 1) targets.push(p);
  }

  // k<=5: 백트래킹으로 최소 할당 비용
  let best = Infinity;

  function dfs(i, usedMask, sum) {
    if (sum >= best) return;          // 가지치기
    if (i === k) {
      best = Math.min(best, sum);
      return;
    }
    for (let j = 0; j < k; j++) {
      if (((usedMask >> j) & 1) === 1) continue;
      const cell = targets[j];
      dfs(i + 1, usedMask | (1 << j), sum + dist[i][cell]);
    }
  }

  dfs(0, 0, 0);
  answer = Math.min(answer, best);
}

console.log(answer);
