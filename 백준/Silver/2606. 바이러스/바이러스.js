const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const numComputers = parseInt(input[0]); // 컴퓨터의 수
  const numConnections = parseInt(input[1]); // 네트워크 연결 수
  const connections = input.slice(2).map((line) => line.split(" ").map(Number)); // 연결 정보
  
  // 인접 리스트 생성
  const graph = Array.from({ length: numComputers + 1 }, () => []);
  for (const [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a); // 양방향 연결
  }

  // 감염 여부 체크 배열
  const visited = Array(numComputers + 1).fill(false);

  // DFS 함수
  const dfs = (node) => {
    visited[node] = true; // 현재 노드 방문 처리
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor); // 방문하지 않은 이웃 노드 재귀 탐색
      }
    }
  };

  // 1번 컴퓨터에서 시작하여 감염 확산
  dfs(1);

  // 감염된 컴퓨터 수 계산 (1번 제외)
  const infectedCount = visited.filter((v) => v).length - 1;
  console.log(infectedCount);
});
