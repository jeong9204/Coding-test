const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const graph = Array.from({ length: N + 1 }, () => []);
const parent = Array(N + 1).fill(0); // 부모 저장 배열

// 인접 리스트 구성
for (let i = 1; i < N; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a); // 양방향 트리
}

// DFS로 부모 찾기
function dfs(current, par) {
  parent[current] = par;
  for (const next of graph[current]) {
    if (next !== par) {
      dfs(next, current);
    }
  }
}

dfs(1, 0); // 루트를 1로 고정하고 탐색 시작

// 결과 출력 (2번 노드부터 출력)
let result = '';
for (let i = 2; i <= N; i++) {
  result += parent[i] + '\n';
}
console.log(result);
