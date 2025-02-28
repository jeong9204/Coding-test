const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const T = parseInt(input[0], 10);
  let results = [];

  for (let i = 1; i <= T; i++) {
    let [x1, y1, r1, x2, y2, r2] = input[i].split(' ').map(Number);

    let dSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2; // 두 원의 중심 거리의 제곱
    let d = Math.sqrt(dSquared); // 중심 사이 거리 (실제 거리)

    let rSum = r1 + r2; // 반지름 합
    let rDiff = Math.abs(r1 - r2); // 반지름 차이

    if (d === 0 && r1 === r2) {
      results.push(-1); // 두 원이 완전히 동일함
    } else if (d > rSum || d < rDiff) {
      results.push(0); // 두 원이 만나지 않음
    } else if (d === rSum || d === rDiff) {
      results.push(1); // 한 점에서 만남 (외접 or 내접)
    } else {
      results.push(2); // 두 점에서 만남
    }
  }

  console.log(results.join('\n'));
});
