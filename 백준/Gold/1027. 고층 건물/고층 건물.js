'use strict';
const fs = require('fs');

const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;
const N = data[p++];
const h = data.slice(p, p + N);

let ans = 0;

for (let i = 0; i < N; i++) {
  let cnt = 0;

  // 오른쪽: 기울기( dy/dx )의 "최대"를 갱신하면 보임
  let hasR = false;
  let bestDyR = 0;
  let bestDxR = 1;

  for (let j = i + 1; j < N; j++) {
    const dy = h[j] - h[i];
    const dx = j - i; // 양수
    if (!hasR || dy * bestDxR > bestDyR * dx) { // strict '>' (접하면 안 보임)
      hasR = true;
      bestDyR = dy;
      bestDxR = dx;
      cnt++;
    }
  }

  // 왼쪽: dx를 (i-j)로 양수화했으면, dy/dx는 "최대"를 갱신해야 보임
  // (실제 기울기 dy/(j-i) = -dy/(i-j) 이라 부호가 뒤집힘)
  let hasL = false;
  let bestDyL = 0;
  let bestDxL = 1;

  for (let j = i - 1; j >= 0; j--) {
    const dy = h[j] - h[i];
    const dx = i - j; // 양수
    if (!hasL || dy * bestDxL > bestDyL * dx) { // 여기! '<'가 아니라 '>'
      hasL = true;
      bestDyL = dy;
      bestDxL = dx;
      cnt++;
    }
  }

  ans = Math.max(ans, cnt);
}

console.log(String(ans));
