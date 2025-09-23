// BOJ 10610 - 30
// 조건: (1) '0'이 최소 하나 (2) 자릿수 합 % 3 === 0
// 만족하면 자릿수를 내림차순으로 정렬해서 출력, 아니면 -1

const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim(); // 숫자 문자열 (길이 최대 1e5)

// 1) 0이 하나라도 있어야 10의 배수
if (!s.includes('0')) {
  console.log(-1);
  process.exit(0);
}

// 2) 자릿수 합이 3의 배수여야 함
let sum = 0;
for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i) - 48; // '0' = 48
if (sum % 3 !== 0) {
  console.log(-1);
  process.exit(0);
}

// 3) 가장 큰 수를 만들기 위해 자릿수를 내림차순으로 정렬
// 자리 종류가 0~9뿐이므로 계수 정렬이 가장 간단하고 빠름 (O(N))
const cnt = Array(10).fill(0);
for (let i = 0; i < s.length; i++) cnt[s.charCodeAt(i) - 48]++;

let out = '';
for (let d = 9; d >= 0; d--) {
  if (cnt[d] > 0) out += String(d).repeat(cnt[d]);
}
console.log(out);
