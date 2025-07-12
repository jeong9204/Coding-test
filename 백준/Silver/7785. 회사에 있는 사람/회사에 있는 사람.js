const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 줄은 기록 수
const n = Number(input[0]);

// Set으로 현재 회사에 있는 사람 관리
const log = new Set();

for (let i = 1; i <= n; i++) {
  const [name, action] = input[i].split(' ');
  if (action === 'enter') {
    log.add(name);      // 출근 시 추가
  } else {
    log.delete(name);   // 퇴근 시 제거
  }
}

// 현재 남아있는 사람들을 배열로 만들고 사전 역순 정렬
const result = Array.from(log).sort().reverse();

// 출력
console.log(result.join('\n'));
