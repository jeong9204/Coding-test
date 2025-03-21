const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const lab = input.slice(1).map(line => line.split(' ').map(Number));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const virus = [];
  const empty = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (lab[i][j] === 2) virus.push([i, j]);
      if (lab[i][j] === 0) empty.push([i, j]);
    }
  }

  const getCombinations = (arr, k) => {
    const result = [];
    const comb = (start, temp) => {
      if (temp.length === k) return result.push([...temp]);
      for (let i = start; i < arr.length; i++) {
        temp.push(arr[i]);
        comb(i + 1, temp);
        temp.pop();
      }
    };
    comb(0, []);
    return result;
  };

  const bfs = (map) => {
    const visited = map.map(row => [...row]);
    const queue = [...virus];

    while (queue.length) {
      const [x, y] = queue.shift();
      for (let dir = 0; dir < 4; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];
        if (nx >= 0 && ny >= 0 && nx < N && ny < M) {
          if (visited[nx][ny] === 0) {
            visited[nx][ny] = 2;
            queue.push([nx, ny]);
          }
        }
      }
    }

    // 안전 영역 개수 세기
    let safe = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (visited[i][j] === 0) safe++;
      }
    }
    return safe;
  };

  const wallCombinations = getCombinations(empty, 3);
  let maxSafeArea = 0;

  for (const walls of wallCombinations) {
    const copiedLab = lab.map(row => [...row]);
    for (const [x, y] of walls) {
      copiedLab[x][y] = 1; // 벽 세우기
    }
    const safeArea = bfs(copiedLab);
    if (safeArea > maxSafeArea) {
      maxSafeArea = safeArea;
    }
  }

  console.log(maxSafeArea);
});
