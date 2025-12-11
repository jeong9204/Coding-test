// 백준 1007: 벡터 매칭
// Node.js (JavaScript) 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const T = parseInt(input[idx++], 10);
const outputs = [];

for (let tc = 0; tc < T; tc++) {
  const N = parseInt(input[idx++], 10);

  const points = [];
  let sumX = 0;
  let sumY = 0;

  for (let i = 0; i < N; i++) {
    const x = parseInt(input[idx++], 10);
    const y = parseInt(input[idx++], 10);
    points.push([x, y]);
    sumX += x;
    sumY += y;
  }

  let minLen = Infinity;
  const half = N / 2;

  function dfs(pos, chosen, negX, negY) {
    // 앞으로 선택할 수 있는 최대 개수가 부족하면 가지치기
    if (chosen > half) return;
    if (half - chosen > N - pos) return;

    // 모든 점을 다 봤을 때
    if (pos === N) {
      if (chosen === half) {
        const vx = sumX - 2 * negX;
        const vy = sumY - 2 * negY;
        const len = Math.sqrt(vx * vx + vy * vy);
        if (len < minLen) minLen = len;
      }
      return;
    }

    // 1) 현재 점을 -1 그룹으로 고르지 않음 (즉, +1 그룹)
    dfs(pos + 1, chosen, negX, negY);

    // 2) 현재 점을 -1 그룹으로 고름
    const [x, y] = points[pos];
    dfs(pos + 1, chosen + 1, negX + x, negY + y);
  }

  dfs(0, 0, 0, 0);

  // 출력 형식: 충분히 많은 소수점 자릿수를 출력
  outputs.push(minLen.toString());
}

console.log(outputs.join('\n'));
