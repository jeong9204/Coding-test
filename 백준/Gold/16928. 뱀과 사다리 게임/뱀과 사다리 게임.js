const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number); // 사다리 N개, 뱀 M개
  const board = Array(101).fill(0).map((_, idx) => idx); // 1~100까지 자기 자신으로 초기화

  // 사다리 정보 반영
  for (let i = 1; i <= N; i++) {
    const [from, to] = input[i].split(' ').map(Number);
    board[from] = to;
  }

  // 뱀 정보 반영
  for (let i = N + 1; i <= N + M; i++) {
    const [from, to] = input[i].split(' ').map(Number);
    board[from] = to;
  }

  const visited = Array(101).fill(false);
  const queue = [[1, 0]]; // [현재 위치, 주사위 횟수]
  visited[1] = true;

  while (queue.length) {
    const [now, count] = queue.shift();

    if (now === 100) {
      console.log(count);
      return;
    }

    for (let dice = 1; dice <= 6; dice++) {
      let next = now + dice;
      if (next > 100) continue;

      next = board[next]; // 사다리/뱀 처리 후 위치

      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, count + 1]);
      }
    }
  }
});
