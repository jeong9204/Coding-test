const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  // 첫 번째 줄: K (이미 가지고 있는 랜선 개수), N (필요한 랜선 개수)
  const [K, N] = input[0].split(' ').map(Number);
  // 다음 K줄: 각 랜선의 길이
  const cables = input.slice(1).map(Number);

  let low = 1;                       // 가능한 최소 길이
  let high = Math.max(...cables);    // 가능한 최대 길이 (가장 긴 랜선)
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);  // 현재 시도하는 랜선의 길이
    let count = 0;
    
    // 각 랜선에서 잘라낼 수 있는 랜선의 개수를 합산
    for (let i = 0; i < cables.length; i++) {
      count += Math.floor(cables[i] / mid);
    }
    
    // count가 필요한 개수 이상이면 현재 길이는 가능한 후보
    if (count >= N) {
      result = mid;       // 후보 업데이트
      low = mid + 1;      // 더 긴 길이로 시도
    } else {
      high = mid - 1;     // 길이를 줄여야 함
    }
  }

  console.log(result);
});
