// BOJ 1300: K번째 수
// Node.js (값 기준 이분 탐색 + 개수 세기)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0].trim());
const k = Number(input[1].trim());

function countLE(x) {
  // A 전체에서 x 이하인 원소의 개수를 센다.
  let cnt = 0;
  for (let i = 1; i <= N; i++) {
    // i번째 행에서 x 이하인 개수: min(N, Math.floor(x / i))
    cnt += Math.min(N, Math.floor(x / i));
    // cnt가 k를 훨씬 넘어가도 그냥 계속 더해도 되지만,
    // 약간 최적화하고 싶다면 if (cnt > k) break; 해도 됨.
  }
  return cnt;
}

let lo = 1;
let hi = N * N; // 최대 값

let answer = hi;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2); // 후보 값

  const cnt = countLE(mid); // mid 이하 원소 개수

  if (cnt >= k) {
    // mid 이하가 k개 이상 → B[k]는 mid보다 크지 않음
    answer = mid;
    hi = mid - 1;
  } else {
    // mid 이하가 k개보다 적음 → B[k]는 mid보다 커야 함
    lo = mid + 1;
  }
}

console.log(answer.toString());
