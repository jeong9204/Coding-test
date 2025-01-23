const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [N, K] = line.split(' ').map(Number);
  rl.close();

  console.log(findMinimumTime(N, K));
});

function findMinimumTime(start, target) {
  if (start === target) return 0; // 이미 같은 위치라면 0초

  const visited = Array(100001).fill(false); // 방문 체크 배열
  const queue = []; // BFS 큐
  queue.push({ position: start, time: 0 }); // 초기값: 시작 위치와 시간

  while (queue.length > 0) {
    const { position, time } = queue.shift();

    if (position === target) return time; // 동생 위치에 도달하면 시간 반환

    // 다음으로 이동할 위치들
    const nextPositions = [position - 1, position + 1, position * 2];

    for (const next of nextPositions) {
      if (next >= 0 && next <= 100000 && !visited[next]) {
        visited[next] = true; // 방문 체크
        queue.push({ position: next, time: time + 1 }); // 큐에 추가
      }
    }
  }

  return -1; // 이 부분은 실행되지 않음 (문제 조건상 항상 도달 가능)
}
