const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');

// ----- 빠른 정수 파서 -----
let p = 0;
const L = data.length;
function nextInt() {
  // 공백/개행 스킵
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c > 32) break;
    p++;
  }
  let sign = 1;
  if (data[p] === '-') { sign = -1; p++; }
  let num = 0;
  while (p < L) {
    const c = data.charCodeAt(p);
    if (c <= 32) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num * sign;
}

// ----- 입력 -----
const N = nextInt();
const M = nextInt();
const K = nextInt();
const X = nextInt();

// 인접 리스트
const adj = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const A = nextInt();
  const B = nextInt();
  adj[A].push(B);
}

// ----- BFS -----
const dist = new Int32Array(N + 1);
for (let i = 1; i <= N; i++) dist[i] = -1;
dist[X] = 0;

// 큐 (배열 + 인덱스로 O(1) pop)
const q = new Int32Array(N + 5);
let head = 0, tail = 0;
q[tail++] = X;

const answers = []; // K거리 도시 모으기

while (head < tail) {
  const u = q[head++];
  const du = dist[u];

  // dist == K 노드는 더 확장할 필요 없음(이미 결과 후보이므로)
  if (du === K) continue;

  // 인접 정점 탐색
  const list = adj[u];
  for (let i = 0; i < list.length; i++) {
    const v = list[i];
    if (dist[v] !== -1) continue;
    const nd = du + 1;
    dist[v] = nd;

    if (nd === K) {
      // 정확히 K면 결과에만 추가, 큐에는 넣지 않음(가지치기)
      answers.push(v);
    } else if (nd < K) {
      // K 미만이면 다음 레벨 확장 위해 큐에 삽입
      q[tail++] = v;
    }
    // nd > K는 발생하지 않음(위에서 가지치기)
  }
}

// ----- 출력 -----
if (answers.length === 0) {
  console.log(-1);
} else {
  answers.sort((a, b) => a - b);
  console.log(answers.join('\n'));
}
