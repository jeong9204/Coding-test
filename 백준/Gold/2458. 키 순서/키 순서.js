'use strict';

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];

// graph[i][j] = true 이면 i번 학생이 j번 학생보다 키가 작다
const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

// 직접 비교 결과 입력
for (let i = 0; i < M; i++) {
  const a = input[idx++];
  const b = input[idx++];
  graph[a][b] = true;
}

// 플로이드-워셜
for (let k = 1; k <= N; k++) {
  for (let i = 1; i <= N; i++) {
    if (!graph[i][k]) continue; // 가지치기
    for (let j = 1; j <= N; j++) {
      if (graph[k][j]) {
        graph[i][j] = true;
      }
    }
  }
}

// 자신의 정확한 순서를 알 수 있는 학생 수 계산
let answer = 0;

for (let i = 1; i <= N; i++) {
  let known = 0;

  for (let j = 1; j <= N; j++) {
    if (i === j) continue;

    // i < j 또는 j < i 둘 중 하나라도 알면 관계가 결정된 것
    if (graph[i][j] || graph[j][i]) {
      known++;
    }
  }

  if (known === N - 1) answer++;
}

console.log(answer);