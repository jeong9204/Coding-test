// BOJ - 가장 긴 증가하는 부분 수열 (길이)
// O(N log N) patience sorting + lower_bound(>=) 사용
// 입력이 매우 커서: 문자열 직접 스캔(nextInt)로 파싱 최적화

const fs = require('fs');
const s = fs.readFileSync(0, 'utf8');
let idx = 0;
const L = s.length;

function nextInt() {
  // 공백 스킵
  while (idx < L) {
    const c = s.charCodeAt(idx);
    if (c > 32) break; // not whitespace
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

const N = nextInt();
const tails = []; // tails[len-1] = 길이 len인 증가 부분 수열의 '가장 작은' 끝값

for (let i = 0; i < N; i++) {
  const x = nextInt();

  // lower_bound: 첫 번째로 tails[mid] >= x 인 위치 찾기 (strict 증가 ⇒ >=)
  let l = 0, r = tails.length;
  while (l < r) {
    const m = (l + r) >> 1;
    if (tails[m] >= x) r = m;
    else l = m + 1;
  }
  tails[l] = x;           // 새 길이 l+1 수열의 최소 가능한 끝값 갱신/확장
}

console.log(tails.length.toString()); // LIS 길이
