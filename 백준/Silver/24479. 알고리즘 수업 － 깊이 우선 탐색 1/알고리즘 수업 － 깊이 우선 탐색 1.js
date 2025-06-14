const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M, R] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(0); // 방문 순서 저장
let order = 1;

// 간선 입력 처리
for (let i = 1; i <= M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

// 인접 리스트 오름차순 정렬
for (let i = 1; i <= N; i++) {
  graph[i].sort((a, b) => a - b);
}

// DFS 함수 정의
function dfs(node) {
  visited[node] = order++; // 방문 순서 기록
  for (const next of graph[node]) {
    if (!visited[next]) {
      dfs(next);
    }
  }
}

dfs(R);

// 출력
console.log(visited.slice(1).join('\n'));
