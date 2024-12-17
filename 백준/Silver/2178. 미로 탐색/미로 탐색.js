const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number); // N: 행의 수, M: 열의 수
  const maze = input.slice(1).map((row) => row.split("").map(Number));

  // 방향 벡터 (상, 하, 좌, 우 이동을 나타냄)
  const directions = [
    [0, 1],  // 오른쪽
    [0, -1], // 왼쪽
    [1, 0],  // 아래
    [-1, 0], // 위
  ];

  const visited = Array.from({ length: N }, () => Array(M).fill(false)); // 방문 여부 확인 배열

  const queue = []; // BFS 큐
  queue.push([0, 0, 1]); // 시작점 (0,0)과 지나온 칸 수 1을 큐에 넣음
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y, count] = queue.shift();

    // 도착지에 도달했으면 결과 출력 후 종료
    if (x === N - 1 && y === M - 1) {
      console.log(count);
      break;
    }

    // 상하좌우로 이동
    for (let i = 0; i < 4; i++) {
      const nx = x + directions[i][0];
      const ny = y + directions[i][1];

      // 이동 가능한 칸인지 확인
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M &&
        maze[nx][ny] === 1 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true; // 방문 처리
        queue.push([nx, ny, count + 1]); // 이동 후 큐에 넣기
      }
    }
  }
});
