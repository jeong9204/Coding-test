// BOJ 2470 - 두 용액 (Two Pointers) / Node.js
// 입력: N, 그리고 N개의 정수
// 출력: 합이 0에 가장 가까운 두 수 (오름차순)

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const N = Number(lines[0]);
  // 숫자들이 한 줄 이상에 걸쳐 들어오는 경우를 대비해 전부 모아서 파싱
  const nums = lines.slice(1).join(' ').split(/\s+/).map(Number);

  nums.sort((a, b) => a - b);

  let l = 0;
  let r = N - 1;
  let bestL = nums[l];
  let bestR = nums[r];
  let bestAbs = Math.abs(bestL + bestR);

  while (l < r) {
    const sum = nums[l] + nums[r];
    const abs = Math.abs(sum);

    if (abs < bestAbs) {
      bestAbs = abs;
      bestL = nums[l];
      bestR = nums[r];
      if (bestAbs === 0) break; // 최적
    }

    if (sum > 0) {
      r--; // 합을 줄이기 위해 오른쪽 감소
    } else {
      l++; // 합을 키우기 위해 왼쪽 증가
    }
  }

  console.log(bestL + ' ' + bestR);
});
