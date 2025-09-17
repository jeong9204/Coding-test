// BOJ 1004 - 어린 왕자 (Node.js)
// 아이디어: 원 하나당 출발점/도착점 포함 여부가 다르면(배타적) 경계 1회 통과.
// dist^2로 비교하여 sqrt 회피, 경계 위 입력 없음 → '<' 비교만 사용.

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const tok = lines.join(' ').split(/\s+/).map(Number);
  let i = 0;

  const T = tok[i++];         // 테스트 케이스 수
  const out = [];

  const dist2 = (x1, y1, x2, y2) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  };

  for (let tc = 0; tc < T; tc++) {
    const x1 = tok[i++], y1 = tok[i++], x2 = tok[i++], y2 = tok[i++];
    const n  = tok[i++];

    let cnt = 0;

    for (let k = 0; k < n; k++) {
      const cx = tok[i++], cy = tok[i++], r = tok[i++];
      const r2 = r * r;

      const startInside = dist2(x1, y1, cx, cy) < r2;
      const endInside   = dist2(x2, y2, cx, cy) < r2;

      if (startInside !== endInside) cnt++;
    }

    out.push(String(cnt));
  }

  console.log(out.join('\n'));
});
