const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [V, E] = input[0].split(' ').map(Number); // 정점 개수, 간선 개수
  const edges = [];

  for (let i = 1; i <= E; i++) {
    const [A, B, C] = input[i].split(' ').map(Number);
    edges.push([C, A, B]); // [가중치, 정점1, 정점2] 형태로 저장
  }

  // 가중치 기준으로 오름차순 정렬
  edges.sort((a, b) => a[0] - b[0]);

  // 유니온 파인드를 위한 부모 배열 초기화
  const parent = Array.from({ length: V + 1 }, (_, i) => i);

  // find 함수 (루트 노드 찾기)
  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // 경로 압축
    }
    return parent[x];
  }

  // union 함수 (두 정점을 연결)
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootY] = rootX; // 한 쪽 루트를 다른 쪽에 붙임
      return true;
    }
    return false; // 이미 같은 집합이면 사이클 발생 -> 추가 안 함
  }

  let totalWeight = 0;
  let edgeCount = 0;

  for (const [weight, a, b] of edges) {
    if (union(a, b)) {
      totalWeight += weight;
      edgeCount++;
      if (edgeCount === V - 1) break; // MST 완성 시 종료
    }
  }

  console.log(totalWeight);
});
