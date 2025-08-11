// BOJ: 서로 다른 부분 문자열 개수 (S 길이 ≤ 1000)
// 방법: Suffix Array(더블링) + Kasai LCP -> n(n+1)/2 - sum(LCP)

const fs = require('fs');

const S = fs.readFileSync(0, 'utf8').trim();
const n = S.length;

// --- 1) Suffix Array (Doubling) ---
const sa = Array.from({ length: n }, (_, i) => i);
let rank = Array.from({ length: n }, (_, i) => S.charCodeAt(i));
let tmp = Array(n);

for (let k = 1; k < n; k <<= 1) {
  sa.sort((a, b) => {
    if (rank[a] !== rank[b]) return rank[a] - rank[b];
    const ra = a + k < n ? rank[a + k] : -1;
    const rb = b + k < n ? rank[b + k] : -1;
    return ra - rb;
  });

  tmp[sa[0]] = 0;
  for (let i = 1; i < n; i++) {
    const a = sa[i - 1], b = sa[i];
    const prev = [rank[a], a + k < n ? rank[a + k] : -1];
    const curr = [rank[b], b + k < n ? rank[b + k] : -1];
    tmp[b] = tmp[a] + (prev[0] !== curr[0] || prev[1] !== curr[1] ? 1 : 0);
  }
  // 새 rank로 갱신
  rank = tmp.slice();
  // 모든 rank가 0..n-1로 고유해지면 조기 종료
  if (rank[sa[n - 1]] === n - 1) break;
}

// --- 2) LCP (Kasai) ---
const lcp = Array(n).fill(0);
const pos = Array(n); // 각 접미사의 SA 내 위치
for (let i = 0; i < n; i++) pos[sa[i]] = i;

let k = 0;
for (let i = 0; i < n; i++) {
  const pi = pos[i];
  if (pi === 0) { // SA에서 첫 번째는 LCP 없음
    k = 0;
    continue;
  }
  const j = sa[pi - 1];
  while (i + k < n && j + k < n && S[i + k] === S[j + k]) k++;
  lcp[pi] = k;
  if (k > 0) k--; // 다음 비교를 위해 한 글자 줄임(아몰가 대칭 성질)
}

// --- 3) 결과 계산: 전체 부분문자열 - LCP 합 ---
const totalSubstrings = (n * (n + 1)) / 2;
const sumLCP = lcp.reduce((a, b) => a + b, 0);
const answer = totalSubstrings - sumLCP;

console.log(answer);
