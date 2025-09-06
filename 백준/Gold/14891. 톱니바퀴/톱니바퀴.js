// BOJ 14891 - 톱니바퀴
// 규칙: 전파는 "회전 전 치형 상태(2,6)"로 결정 → 전파 방향 배열 dir[] 확정 후 동시에 회전

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    // 1) 톱니 4개 파싱: 각 줄이 '01010101' 형태
    const gears = [];
    for (let i = 0; i < 4; i++) {
      // 문자 배열로 보관 ('0'/'1'), 비교가 쉬움
      gears.push(lines[i].split(''));
    }

    const K = parseInt(lines[4], 10);
    const cmdLines = lines.slice(5, 5 + K);

    // 회전 함수: 시계 1, 반시계 -1
    const rotate = (arr, dir) => {
      if (dir === 1) {
        // 시계: 마지막을 맨 앞으로
        arr.unshift(arr.pop());
      } else if (dir === -1) {
        // 반시계: 첫 번째를 맨 뒤로
        arr.push(arr.shift());
      }
    };

    for (let t = 0; t < K; t++) {
      const [numStr, dirStr] = cmdLines[t].split(/\s+/);
      const gearIdx = parseInt(numStr, 10) - 1; // 0-based
      const firstDir = parseInt(dirStr, 10);    // 1 or -1

      // 2) 전파 방향 결정 (회전 전 상태로만 판단)
      const dir = [0, 0, 0, 0];
      dir[gearIdx] = firstDir;

      // 왼쪽으로 전파: i-1 ← i
      for (let i = gearIdx - 1; i >= 0; i--) {
        // 오른쪽(i+1)의 왼쪽 치형(6) vs 왼쪽(i)의 오른쪽 치형(2)
        const rightGear = i + 1;
        const contactDifferent = gears[i][2] !== gears[rightGear][6];
        if (contactDifferent) {
          dir[i] = -dir[i + 1]; // 반대방향
        } else {
          break; // 같은 극이면 더 이상 전파 안 됨
        }
      }

      // 오른쪽으로 전파: i+1 ← i
      for (let i = gearIdx + 1; i < 4; i++) {
        const leftGear = i - 1;
        const contactDifferent = gears[leftGear][2] !== gears[i][6];
        if (contactDifferent) {
          dir[i] = -dir[i - 1];
        } else {
          break;
        }
      }

      // 3) 동시에 회전 적용
      for (let i = 0; i < 4; i++) {
        if (dir[i] !== 0) rotate(gears[i], dir[i]);
      }
    }

    // 4) 점수 계산: 12시(인덱스 0)가 '1'(S)이면 1<<i 점
    let score = 0;
    for (let i = 0; i < 4; i++) {
      if (gears[i][0] === '1') score += (1 << i);
    }

    console.log(score.toString());
  });
