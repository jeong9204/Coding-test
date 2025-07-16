const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  const N = +input[0];
  const map = input.slice(1).map(line => line.split(" ").map(Number));
  const dx = [-1, 0, 0, 1]; // 상 좌 우 하
  const dy = [0, -1, 1, 0];

  let sharkSize = 2;
  let eaten = 0;
  let time = 0;
  let sx, sy;

  // 아기 상어 초기 위치 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 9) {
        sx = i;
        sy = j;
        map[i][j] = 0; // 초기 위치 비움
      }
    }
  }

  const bfs = (x, y, size) => {
    const visited = Array.from({ length: N }, () => Array(N).fill(-1));
    const q = [[x, y]];
    visited[x][y] = 0;

    let fish = [];

    while (q.length) {
      const [cx, cy] = q.shift();

      for (let d = 0; d < 4; d++) {
        const nx = cx + dx[d];
        const ny = cy + dy[d];

        if (
          nx >= 0 && nx < N &&
          ny >= 0 && ny < N &&
          visited[nx][ny] === -1 &&
          map[nx][ny] <= size
        ) {
          visited[nx][ny] = visited[cx][cy] + 1;
          q.push([nx, ny]);

          if (map[nx][ny] > 0 && map[nx][ny] < size) {
            fish.push([visited[nx][ny], nx, ny]);
          }
        }
      }
    }

    if (fish.length === 0) return null;
    fish.sort((a, b) => {
      if (a[0] !== b[0]) return a[0] - b[0]; // 거리
      if (a[1] !== b[1]) return a[1] - b[1]; // 행
      return a[2] - b[2]; // 열
    });

    return fish[0];
  };

  while (true) {
    const result = bfs(sx, sy, sharkSize);
    if (!result) break;

    const [dist, nx, ny] = result;
    time += dist;
    eaten += 1;
    map[nx][ny] = 0;
    sx = nx;
    sy = ny;

    if (eaten === sharkSize) {
      sharkSize += 1;
      eaten = 0;
    }
  }

  console.log(time);
});
