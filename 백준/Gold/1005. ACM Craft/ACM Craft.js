// BOJ 1005 - ACM Craft
// 알고리즘: 위상정렬 + DP
// dp[v] = max(dp[v], dp[u] + time[v]) for each edge u->v

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const tok = lines.join(' ').trim().split(/\s+/).map(Number);
  let p = 0;

  const T = tok[p++];            // 테스트 케이스 수
  const out = [];

  for (let tc = 0; tc < T; tc++) {
    const N = tok[p++], K = tok[p++];

    // 1-based indexing
    const time = Array(N + 1).fill(0);
    for (let i = 1; i <= N; i++) time[i] = tok[p++];

    const graph = Array.from({ length: N + 1 }, () => []);
    const indeg = Array(N + 1).fill(0);

    for (let i = 0; i < K; i++) {
      const x = tok[p++], y = tok[p++];
      graph[x].push(y);
      indeg[y]++;
    }

    const W = tok[p++];

    // 위상 + DP
    const dp = Array(N + 1).fill(0);
    // 진입차수 0이면 자기 시간으로 초기화
    const queue = [];
    let qh = 0; // head 포인터(shift O(1) 대체)

    for (let i = 1; i <= N; i++) {
      if (indeg[i] === 0) {
        dp[i] = time[i];
        queue.push(i);
      }
    }

    let answer = 0;

    while (qh < queue.length) {
      const u = queue[qh++];

      if (u === W) { // 목표가 큐에서 나오면 정답 확정
        answer = dp[u];
        break;
      }

      for (const v of graph[u]) {
        // u를 다 지은 뒤 v를 시작 → v의 완성 후보시간 갱신
        if (dp[v] < dp[u] + time[v]) {
          dp[v] = dp[u] + time[v];
        }
        if (--indeg[v] === 0) {
          // 선행 다 끝났으면 큐에 투입
          // (여기서 dp[v]는 모든 선행의 max를 반영해나가는 중)
          // 진입차수 0이 될 때 dp[v]가 0일 수도 있으나,
          // 이미 위 루프에서 갱신을 최소 1회 했기 때문에 OK.
          if (dp[v] === 0) dp[v] = time[v]; // 안전 가드 (고립 노드 대비)
          queue.push(v);
        }
      }
    }

    // 혹시 위 루프에서 W를 못 끊고 끝났다면(안전망)
    if (answer === 0) answer = dp[W];

    out.push(String(answer));
  }

  console.log(out.join('\n'));
});
