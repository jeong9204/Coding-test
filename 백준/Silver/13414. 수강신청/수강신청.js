const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [K, L] = input[0].split(' ').map(Number);
const students = input.slice(1, L + 1);

const seen = new Set();
const result = [];

// 뒤에서부터 보면서 마지막 클릭만 남긴다.
for (let i = L - 1; i >= 0; i--) {
  const studentId = students[i];

  if (!seen.has(studentId)) {
    seen.add(studentId);
    result.push(studentId);
  }
}

// 뒤집어서 원래 순서로 복원
result.reverse();

// 앞에서 K명만 출력
console.log(result.slice(0, K).join('\n'));