const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);

let p = 0;
const N = input[p++];

// 1-based로 다루기 위해 앞에 더미 0 하나 둠
const sw = [0];
for (let i = 0; i < N; i++) sw.push(input[p++]);

const S = input[p++]; // 학생 수

const toggle = (idx) => {
  sw[idx] = sw[idx] ^ 1; // 0↔1 토글
};

for (let s = 0; s < S; s++) {
  const gender = input[p++]; // 1(남), 2(여)
  const num = input[p++];

  if (gender === 1) {
    // 남학생: num의 배수 인덱스 토글
    for (let i = num; i <= N; i += num) {
      toggle(i);
    }
  } else {
    // 여학생: 중심 num에서 좌우 대칭 최대 확장 후 구간 토글
    let left = num;
    let right = num;

    while (left - 1 >= 1 && right + 1 <= N && sw[left - 1] === sw[right + 1]) {
      left--;
      right++;
    }
    for (let i = left; i <= right; i++) toggle(i);
  }
}

// 출력: 20개씩 줄바꿈
let out = [];
for (let i = 1; i <= N; i++) {
  out.push(sw[i]);
  if (i % 20 === 0) {
    console.log(out.join(' '));
    out = [];
  }
}
if (out.length) console.log(out.join(' '));
