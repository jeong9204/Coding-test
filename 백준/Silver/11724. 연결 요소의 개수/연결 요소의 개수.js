const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', (line) => {
    input.push(line.trim());
}).on('close', () => {
    const [N, M] = input[0].split(' ').map(Number); // 정점 개수 N, 간선 개수 M
    const graph = Array.from({ length: N + 1 }, () => []); // 인접 리스트
    const visited = Array(N + 1).fill(false); // 방문 여부 저장

    // 그래프 구성
    for (let i = 1; i <= M; i++) {
        const [u, v] = input[i].split(' ').map(Number);
        graph[u].push(v);
        graph[v].push(u); // 무방향 그래프
    }

    let componentCount = 0;

    // DFS 함수 정의
    function dfs(node) {
        visited[node] = true; // 방문 처리
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                dfs(neighbor);
            }
        }
    }

    // 모든 정점 탐색
    for (let i = 1; i <= N; i++) {
        if (!visited[i]) { // 방문하지 않은 정점 발견
            dfs(i); // DFS 탐색
            componentCount++; // 연결 요소 증가
        }
    }

    console.log(componentCount); // 연결 요소 개수 출력
});
