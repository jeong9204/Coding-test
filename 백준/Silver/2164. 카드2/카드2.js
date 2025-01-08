const readline = require('readline');

// 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 시간초과를 방지한 최적화 코드
rl.on('line', (line) => {
  const N = parseInt(line.trim(), 10);

  // 큐를 LinkedList처럼 동작
  const queue = [];
  for (let i = 1; i <= N; i++) {
    queue.push(i);
  }

  let front = 0; // 큐의 시작 인덱스
  let rear = N;  // 큐의 끝 인덱스

  while (rear - front > 1) {
    front++; // 첫 번째 카드 버리기
    queue[rear++] = queue[front++]; // 두 번째 카드를 맨 뒤로 이동
  }

  console.log(queue[front]); // 마지막 남은 카드 출력
  rl.close();
});
