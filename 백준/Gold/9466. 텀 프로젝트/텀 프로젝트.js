// BOJ 9466 텀 프로젝트 - Node.js 풀이 (DFS + visited + done)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let t = Number(input[0]);
let line = 1;
const outputs = [];

while (t--) {
  const n = Number(input[line++].trim());

  // 1번 ~ n번 학생이 선택한 번호 배열
  const nums = input[line++].trim().split(' ').map(Number);
  const choice = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    choice[i] = nums[i - 1];
  }

  const visited = new Array(n + 1).fill(false); // 방문 여부
  const done = new Array(n + 1).fill(false);    // 처리 완료 여부
  let teamCount = 0; // 팀에 속한 학생 수 (사이클 노드 수 합)

  function dfs(x) {
    visited[x] = true;
    const y = choice[x];

    if (!visited[y]) {
      // 아직 방문 안 한 학생이면 계속 탐색
      dfs(y);
    } else if (!done[y]) {
      // visited[y]는 true인데 done[y]는 false → 사이클 발견
      let cur = y;
      let cnt = 1;
      // y에서 시작해서 다시 y로 돌아올 때까지 카운트
      while (choice[cur] !== y) {
        cur = choice[cur];
        cnt++;
      }
      teamCount += cnt;
    }

    // x에서 이어지는 경로에 대해 사이클 체크 및 카운트가 끝났으므로
    done[x] = true;
  }

  // 모든 학생에 대해 DFS 시작 (이미 방문한 학생은 패스)
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  // 팀에 속하지 못한 학생 수 = 전체 - 팀원 수
  outputs.push(String(n - teamCount));
}

console.log(outputs.join('\n'));
