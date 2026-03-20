const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const S = input[0].trim();
const q = Number(input[1]);
const n = S.length;

// 26개 알파벳에 대한 누적합 배열
const prefix = Array.from({ length: 26 }, () => new Array(n + 1).fill(0));

// 누적합 생성
for (let i = 0; i < n; i++) {
  const charIndex = S.charCodeAt(i) - 97; // 'a' = 97

  for (let c = 0; c < 26; c++) {
    prefix[c][i + 1] = prefix[c][i];
  }

  prefix[charIndex][i + 1]++;
}

const result = [];

for (let i = 2; i < 2 + q; i++) {
  const [alpha, lStr, rStr] = input[i].split(' ');
  const l = Number(lStr);
  const r = Number(rStr);
  const idx = alpha.charCodeAt(0) - 97;

  const count = prefix[idx][r + 1] - prefix[idx][l];
  result.push(String(count));
}

console.log(result.join('\n'));