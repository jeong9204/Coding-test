// BOJ 1946 - 신입 사원
// 전략: (서류, 면접) 중 서류 오름차순으로 정렬 후,
//       면접 최소값을 갱신하며 면접이 더 좋은 경우만 카운트.
// 시간: O(N log N) / 테스트케이스당

const fs = require('fs');
const s = fs.readFileSync(0, 'utf8');
let idx = 0;
const L = s.length;

function nextInt() {
  // 공백 스킵
  while (idx < L) {
    const c = s.charCodeAt(idx);
    if (c > 32) break;
    idx++;
  }
  // 숫자 읽기
  let num = 0;
  while (idx < L) {
    const c = s.charCodeAt(idx);
    if (c <= 32) { idx++; break; }
    num = num * 10 + (c - 48);
    idx++;
  }
  return num;
}

const T = nextInt();
const out = [];

for (let tc = 0; tc < T; tc++) {
  const N = nextInt();
  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    const doc = nextInt();
    const interview = nextInt();
    arr[i] = [doc, interview];
  }

  // 서류 순위 오름차순 정렬
  arr.sort((a, b) => a[0] - b[0]);

  let count = 0;
  let bestInterview = Infinity;

  for (let i = 0; i < N; i++) {
    const interview = arr[i][1];
    if (interview < bestInterview) {
      count++;
      bestInterview = interview;
    }
  }

  out.push(String(count));
}

console.log(out.join('\n'));
