// BOJ 1550 - 16진수
// 16진수 문자열을 10진수로 변환하여 출력

const fs = require('fs');

const hex = fs.readFileSync(0, 'utf8').trim();   // 예: "A", "1F3", "00FF"
const dec = parseInt(hex, 16);                   // 16진수 → 10진수
console.log(dec.toString());
