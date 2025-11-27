// BOJ 14890: 경사로
// Node.js

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, L] = input[0].trim().split(' ').map(Number);
const map = [];

for (let i = 1; i <= N; i++) {
  map.push(input[i].trim().split(' ').map(Number));
}

// 한 줄(행/열)을 받아, 경사로 조건을 만족하며 끝까지 지나갈 수 있는지 판별
function check(line) {
  const used = new Array(N).fill(false); // 경사로 사용 여부

  for (let i = 0; i < N - 1; i++) {
    const curr = line[i];
    const next = line[i + 1];

    if (curr === next) {
      // 높이 같으면 그냥 진행
      continue;
    }

    const diff = curr - next;

    // 높이 차이가 1보다 크면 불가능
    if (Math.abs(diff) > 1) return false;

    if (diff === -1) {
      // curr < next  (오르막, curr가 낮은 쪽)
      // i, i-1, ..., i-L+1 칸이 모두 curr와 같고, 아직 경사로 미사용이어야 한다.
      const height = curr;
      for (let j = i; j > i - L; j--) {
        if (j < 0) return false;                 // 범위 밖
        if (line[j] !== height) return false;    // 높이 다름
        if (used[j]) return false;               // 이미 경사로 있음
      }
      // 경사로 설치 처리
      for (let j = i; j > i - L; j--) {
        used[j] = true;
      }
    } else if (diff === 1) {
      // curr > next  (내리막, next가 낮은 쪽)
      // i+1, i+2, ..., i+L 칸이 모두 next와 같고, 경사로 미사용이어야 한다.
      const height = next;
      for (let j = i + 1; j <= i + L; j++) {
        if (j >= N) return false;               // 범위 밖
        if (line[j] !== height) return false;   // 높이 다름
        if (used[j]) return false;              // 이미 경사로 있음
      }
      // 경사로 설치 처리
      for (let j = i + 1; j <= i + L; j++) {
        used[j] = true;
      }
    }
  }

  return true; // 끝까지 문제 없으면 이 길은 가능
}

let answer = 0;

// 1) 행 검사
for (let r = 0; r < N; r++) {
  const row = map[r];
  if (check(row)) answer++;
}

// 2) 열 검사
for (let c = 0; c < N; c++) {
  const col = new Array(N);
  for (let r = 0; r < N; r++) {
    col[r] = map[r][c];
  }
  if (check(col)) answer++;
}

console.log(answer.toString());
