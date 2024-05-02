function solution(n, path, order) {
  // graph 초기화
  const graph = {};
  path.forEach(([s, e]) => {
    graph[s] = graph[s] || { flag: false, childs: [] };
    graph[e] = graph[e] || { flag: false, childs: [] };
    graph[s].childs.push(e);
    graph[e].childs.push(s);
  });
  graph[0].flag = true;

  // order 초기화
  const orders = {};
  order.forEach(([s, e]) => {
    orders[e] = s;
  });

  // 그래프를 순회할 dfs
  let visited = new Set();
  const dfs = (startNode) => {
    const stack = [startNode];
    while (stack.length > 0) {
      const node = stack.pop();
      // 이미 방문했거나 방문 순서가 아직 오지 않은 경우 스킵
      if (visited.has(node)) continue;
      if (orders[node] && !graph[orders[node]].flag) continue;
      // 방문 처리
      visited.add(node);
      graph[node].flag = true;
      // 다음 노드들을 스택에 추가
      const nexts = graph[node].childs;
      nexts.forEach((next) => {
        stack.push(next);
      });
    }
  };
  // 기존 방문수를 저장하여 변화가 없을 때까지 반복
  let visitedLength = 0;
  let snapshot = -1;
  while (visitedLength !== snapshot) {
    snapshot = visitedLength;
    dfs(0);
    visitedLength = visited.size;
    visited = new Set();
  }

  return visitedLength === n;
}