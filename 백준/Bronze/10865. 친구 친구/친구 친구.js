const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [NM, ...rest] = input;
const [N, M] = NM.split(' ').map(Number);

const friends = Array(N + 1).fill(0); // 친구 수를 저장할 배열

for (let i = 0; i < M; i++) {
  const [a, b] = rest[i].split(' ').map(Number);
  friends[a]++; // a의 친구 수 증가
  friends[b]++; // b의 친구 수 증가
}

// 1번부터 N번까지 친구 수 출력
for (let i = 1; i <= N; i++) {
  console.log(friends[i]);
}
