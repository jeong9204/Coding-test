// BOJ 5525 IOIOI
// 한 번 스캔으로 연속 IOI 개수 세기

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n');
const N = Number(input[0].trim());
const M = Number(input[1].trim());
const S = input[2].trim();

let ans = 0;
let cnt = 0; // 연속으로 발견된 IOI 개수

// i를 "중앙 O" 위치로 잡고 (i-1, i, i+1)이 IOI인지 확인
for (let i = 1; i < M - 1; i++) {
  if (S[i - 1] === 'I' && S[i] === 'O' && S[i + 1] === 'I') {
    cnt++;

    if (cnt >= N) ans++;

    // 겹치는 패턴을 위해 2칸 이동 (다음 'O' 후보로)
    i += 1; // for문에서 i++ 되니까 결과적으로 +2
  } else {
    cnt = 0;
  }
}

console.log(ans.toString());
