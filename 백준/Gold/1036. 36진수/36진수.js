'use strict';
const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split('\n').map(s => s.trim());
let idx = 0;

const N = Number(input[idx++]);
const nums = [];
for (let i = 0; i < N; i++) nums.push(input[idx++]);
const K = Number(input[idx++]);

// 문자 -> 값(0~35)
function charToVal(ch) {
  const code = ch.charCodeAt(0);
  if (code >= 48 && code <= 57) return code - 48;       // '0'~'9'
  return code - 55;                                     // 'A'(65)->10 ... 'Z'(90)->35
}

// BigInt를 36진 문자열(대문자)로
function toBase36Upper(x) {
  // BigInt의 toString(36)은 소문자(a~z)로 나오므로 대문자로 바꿔준다.
  return x.toString(36).toUpperCase();
}

// 36^0 ~ 36^50 까지 미리 계산 (최대 길이 50이므로 49까지면 충분하지만 넉넉히)
const pow36 = Array(51).fill(0n);
pow36[0] = 1n;
for (let i = 1; i <= 50; i++) pow36[i] = pow36[i - 1] * 36n;

// 문자별 gain (0~35)
const gain = Array(36).fill(0n);

// 원래 합
let sum = 0n;

// 입력된 모든 수를 순회하며 sum과 gain 계산
for (const s of nums) {
  const L = s.length;
  // 오른쪽 끝(LSB)이 pos=0
  for (let i = 0; i < L; i++) {
    const ch = s[L - 1 - i];
    const v = charToVal(ch);

    const place = pow36[i]; // 36^i

    // 원래 합에 더하기
    sum += BigInt(v) * place;

    // v를 Z(35)로 바꾸면 (35-v)만큼 증가
    const delta = BigInt(35 - v) * place;
    gain[v] += delta;
  }
}

// gain이 큰 순서로 정렬해서 K개 선택
gain.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));

// 최대 K개까지 더한다 (K가 36보다 클 수 없지만 입력에서 36 가능)
for (let i = 0; i < K && i < 36; i++) {
  // gain이 0이면 더해도 의미 없으니 그냥 더해도 상관없지만,
  // 빠른 종료하고 싶으면 아래처럼 가능:
  if (gain[i] === 0n) break;
  sum += gain[i];
}

console.log(toBase36Upper(sum));
