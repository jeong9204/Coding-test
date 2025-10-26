const fs = require('fs');

// 백준 같은 환경에서는 '/dev/stdin'에서 읽고
// 로컬 테스트용으로는 예: "7 3" 같은 문자열 넣어도 돼
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

const N = input[0];
const K = input[1];

// 2 ~ N 까지 사용할 거라서 N+1 길이로 배열 준비
// false = 아직 안 지워짐, true = 지워짐
const removed = Array(N + 1).fill(false);

let count = 0; // 지금까지 몇 개 지웠는지

for (let p = 2; p <= N; p++) {
  if (removed[p]) continue; // 이미 지워졌으면 소수 후보에서 제외

  // p는 현재 남아있는 가장 작은 수 -> 소수로 확정
  // 이제 p의 배수를 하나씩 지운다
  for (let m = p; m <= N; m += p) {
    if (!removed[m]) {
      removed[m] = true;
      count++;

      if (count === K) {
        console.log(m);
        process.exit(0); // 바로 종료
      }
    }
  }
}
