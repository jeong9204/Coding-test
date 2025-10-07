// 실행: node main.js < input.txt
const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const N = tokens[idx++];

// 부모 배열 읽기
const parent = new Array(N);
for (let i = 0; i < N; i++) parent[i] = tokens[idx++];

// 지울 노드
const del = tokens[idx++];

// 1) children 인접 리스트 구성
const children = Array.from({ length: N }, () => []);
let root = -1;

for (let v = 0; v < N; v++) {
  const p = parent[v];
  if (p === -1) {
    root = v;
  } else {
    children[p].push(v);
  }
}

// 2) del이 루트면 전체가 사라짐
if (del === root) {
  console.log(0);
  process.exit(0);
}

// 3) DFS: 끝에서 리프 개수 반환
function dfs(u) {
  // u 서브트리에서 리프 개수 합을 반환
  // (단, del 서브트리는 진입하지 않음)
  let hasAliveChild = false;
  let sum = 0;

  for (const v of children[u]) {
    if (v === del) continue; // 삭제된 서브트리 진입 금지
    hasAliveChild = true;
    sum += dfs(v);
  }

  // 살아있는(삭제되지 않은) 자식이 하나도 없으면 u는 리프
  return hasAliveChild ? sum : 1;
}

// 4) 루트부터 세면 됨
const answer = dfs(root);
console.log(answer);
