const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [M, N] = input[0].split(' ').map(Number);
  const box = input.slice(1).map((row) => row.split(' ').map(Number));
  console.log(getMinDaysToRipen(M, N, box));
});

function getMinDaysToRipen(M, N, box) {
  const directions = [
    [1, 0], // 아래
    [0, 1], // 오른쪽
    [-1, 0], // 위
    [0, -1], // 왼쪽
  ];
  const queue = [];
  let unripeTomatoes = 0;

  // 초기 상태 큐에 익은 토마토의 위치를 추가하고 익지 않은 토마토 개수를 세기
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (box[y][x] === 1) {
        queue.push([y, x]); // 익은 토마토의 위치
      } else if (box[y][x] === 0) {
        unripeTomatoes++;
      }
    }
  }

  // 저장될 때부터 모든 토마토가 익어있는 경우
  if (unripeTomatoes === 0) return 0;

  let maxDays = 0;
  let front = 0; // 큐의 앞부분을 가리키는 포인터

  // BFS 시작
  while (front < queue.length) {
    const [y, x] = queue[front++];
    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      // 유효한 좌표인지 확인하고, 익지 않은 토마토를 익히기
      if (ny >= 0 && ny < N && nx >= 0 && nx < M && box[ny][nx] === 0) {
        box[ny][nx] = box[y][x] + 1; // 익은 날짜 기록
        unripeTomatoes--;
        queue.push([ny, nx]);
        maxDays = Math.max(maxDays, box[ny][nx] - 1); // 최댓값 업데이트
      }
    }
  }

  // 모든 토마토가 익지 못하는 경우
  return unripeTomatoes > 0 ? -1 : maxDays;
}
