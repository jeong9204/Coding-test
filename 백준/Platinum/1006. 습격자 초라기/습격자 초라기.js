// 백준 1006: 습격자 초라기
// Node.js (JavaScript) 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let idx = 0;
const T = input[idx++];

const INF = 1e9;
const outputs = [];

for (let tc = 0; tc < T; tc++) {
  const N = input[idx++];
  const W = input[idx++];

  const top = new Array(N);
  const bottom = new Array(N);

  for (let i = 0; i < N; i++) top[i] = input[idx++];
  for (let i = 0; i < N; i++) bottom[i] = input[idx++];

  // N == 1은 원형이라고 해도 수평 인접이 없어서 따로 처리
  if (N === 1) {
    const ans = (top[0] + bottom[0] <= W) ? 1 : 2;
    outputs.push(String(ans));
    continue;
  }

  // 공통 DP 함수: start 열부터 a, b, c를 채워 나간다.
  function recur(start, a, b, c) {
    for (let i = start; i < N; i++) {
      // 1) i열을 모두 마무리해서 a[i+1] 갱신
      a[i + 1] = Math.min(b[i] + 1, c[i] + 1);

      // (i열 위/아래를 세로 한 소대로 묶는 경우)
      if (top[i] + bottom[i] <= W) {
        a[i + 1] = Math.min(a[i + 1], a[i] + 1);
      }

      // (i-1, i열을 위/아래 모두 가로로 묶는 경우)
      if (
        i > 0 &&
        top[i - 1] + top[i] <= W &&
        bottom[i - 1] + bottom[i] <= W
      ) {
        a[i + 1] = Math.min(a[i + 1], a[i - 1] + 2);
      }

      // 2) i열에서 i+1열로 가로 돌출 상태(b, c) 만들기
      if (i < N - 1) {
        // 위쪽이 i+1까지, 아래는 i까지 커버 (위 i+1이 돌출)
        b[i + 1] = a[i + 1] + 1; // 위 i+1 단독
        if (top[i] + top[i + 1] <= W) {
          // 위 i, i+1을 가로로 한 소대
          b[i + 1] = Math.min(b[i + 1], c[i] + 1);
        }

        // 아래쪽이 i+1까지, 위는 i까지 커버 (아래 i+1이 돌출)
        c[i + 1] = a[i + 1] + 1; // 아래 i+1 단독
        if (bottom[i] + bottom[i + 1] <= W) {
          // 아래 i, i+1을 가로로 한 소대
          c[i + 1] = Math.min(c[i + 1], b[i] + 1);
        }
      }
    }
  }

  let ans = INF;

  // === 케이스 1: 위/아래 어느 쪽도 (0, N-1)을 가로로 묶지 않는 경우 ===
  {
    const a = new Array(N + 1).fill(INF);
    const b = new Array(N + 1).fill(INF);
    const c = new Array(N + 1).fill(INF);

    a[0] = 0;
    b[0] = 1;
    c[0] = 1;

    recur(0, a, b, c);
    ans = Math.min(ans, a[N]);
  }

  // === 케이스 2: 위쪽 0열과 N-1열을 가로 한 소대로 묶는 경우 ===
  if (top[0] + top[N - 1] <= W) {
    const a = new Array(N + 1).fill(INF);
    const b = new Array(N + 1).fill(INF);
    const c = new Array(N + 1).fill(INF);

    a[0] = 0;
    a[1] = 1; // 아래 0열만 커버된 상태
    b[1] = 2; // 위1, 아래0 각각 단독
    // 아래 0,1을 가로로 묶을 수 있는지
    if (bottom[0] + bottom[1] <= W) {
      c[1] = 1;
    } else {
      c[1] = 2;
    }

    recur(1, a, b, c);
    ans = Math.min(ans, c[N - 1] + 1);
  }

  // === 케이스 3: 아래쪽 0열과 N-1열을 가로 한 소대로 묶는 경우 ===
  if (bottom[0] + bottom[N - 1] <= W) {
    const a = new Array(N + 1).fill(INF);
    const b = new Array(N + 1).fill(INF);
    const c = new Array(N + 1).fill(INF);

    a[0] = 0;
    a[1] = 1; // 위 0열만 커버된 상태
    c[1] = 2; // 위0, 아래1 각각 단독
    // 위 0,1을 가로로 묶을 수 있는지
    if (top[0] + top[1] <= W) {
      b[1] = 1;
    } else {
      b[1] = 2;
    }

    recur(1, a, b, c);
    ans = Math.min(ans, b[N - 1] + 1);
  }

  // === 케이스 4: 위/아래 모두 0열과 N-1열을 가로로 묶는 경우 ===
  if (top[0] + top[N - 1] <= W && bottom[0] + bottom[N - 1] <= W) {
    const a = new Array(N + 1).fill(INF);
    const b = new Array(N + 1).fill(INF);
    const c = new Array(N + 1).fill(INF);

    a[0] = 0;
    a[1] = 0; // 0열 위/아래 모두 이미 처리된 상태
    b[1] = 1;
    c[1] = 1;

    recur(1, a, b, c);
    ans = Math.min(ans, a[N - 1] + 2);
  }

  outputs.push(String(ans));
}

console.log(outputs.join('\n'));
