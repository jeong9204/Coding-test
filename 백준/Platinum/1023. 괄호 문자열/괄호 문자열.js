'use strict';
const fs = require('fs');

const [Ns, Ks] = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
const N = Number(Ns);
let K = BigInt(Ks);

// 2^i 미리 계산 (BigInt)
const pow2 = Array(N + 1).fill(0n);
pow2[0] = 1n;
for (let i = 1; i <= N; i++) pow2[i] = pow2[i - 1] * 2n;

// dp[pos][bal] = 아직 음수(balance<0) 한번도 안 나온 상태에서
//                남은 부분을 채워 "괄호ㄴㄴ문자열"이 되는 경우의 수
// pos: 0..N, bal: 0..N+1
const dp = Array.from({ length: N + 1 }, () => Array(N + 2).fill(0n));

// base: pos==N
for (let bal = 0; bal <= N + 1; bal++) {
  dp[N][bal] = (bal === 0) ? 0n : 1n; // bal==0이면 올바름 -> 괄호ㄴㄴ 아님
}

// bottom-up
for (let pos = N - 1; pos >= 0; pos--) {
  for (let bal = 0; bal <= N; bal++) {
    // '(' 선택
    const cntOpen = dp[pos + 1][bal + 1];

    // ')' 선택
    let cntClose;
    if (bal === 0) {
      // 여기서 ')'를 붙이면 즉시 음수 발생 -> 나머지 어떤 문자열도 전부 괄호ㄴㄴ
      const rem = N - (pos + 1);
      cntClose = pow2[rem];
    } else {
      cntClose = dp[pos + 1][bal - 1];
    }

    dp[pos][bal] = cntOpen + cntClose;
  }
}

const totalInvalid = dp[0][0];
if (K >= totalInvalid) {
  console.log('-1');
  process.exit(0);
}

// 길이 rem짜리 "모든 문자열"에서 사전순 K번째를 생성 ('(' < ')')
// '(' = 0, ')' = 1로 보면 MSB부터 결정하는 이진수와 동일
function buildAny(rem, k) {
  let out = '';
  for (let i = rem - 1; i >= 0; i--) {
    const half = pow2[i];
    if (k < half) out += '(';
    else { out += ')'; k -= half; }
  }
  return out;
}

// K번째 괄호ㄴㄴ 문자열 구성
let ans = '';
let bal = 0;

for (let pos = 0; pos < N; pos++) {
  // '('을 붙였을 때 가능한 괄호ㄴㄴ 개수
  const cntOpen = dp[pos + 1][bal + 1];

  if (K < cntOpen) {
    ans += '(';
    bal += 1;
    continue;
  }

  // ')'로 넘어감
  K -= cntOpen;
  ans += ')';

  if (bal === 0) {
    // 이 순간 음수 발생 -> 뒤는 전부 괄호ㄴㄴ, 남은 부분은 전체 문자열 중 K번째
    const rem = N - (pos + 1);
    ans += buildAny(rem, K);
    console.log(ans);
    process.exit(0);
  } else {
    bal -= 1;
  }
}

// 여기 도달하면 (이론상) 이미 답 완성
console.log(ans);
