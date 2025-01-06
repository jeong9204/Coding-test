const readline = require('readline');

// 상하좌우 방향 벡터
const directions = [
  [-1, 0], // 위
  [1, 0],  // 아래
  [0, -1], // 왼쪽
  [0, 1],  // 오른쪽
];

// DFS로 인접한 배추 탐색 및 방문 처리
const dfs = (x, y, field, visited, n, m) => {
  visited[x][y] = true; // 현재 위치 방문 처리

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (
      nx >= 0 && nx < n && ny >= 0 && ny < m && // 범위 체크
      field[nx][ny] === 1 && !visited[nx][ny]   // 배추가 있고 방문하지 않았으면
    ) {
      dfs(nx, ny, field, visited, n, m); // 인접 배추 탐색
    }
  }
};

// 배추흰지렁이 수 계산
const countWorms = (field, n, m) => {
  const visited = Array.from({ length: n }, () => Array(m).fill(false)); // 방문 여부 저장
  let wormCount = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (field[i][j] === 1 && !visited[i][j]) {
        wormCount++; // 새로운 지렁이 필요
        dfs(i, j, field, visited, n, m); // 연결된 배추들 방문 처리
      }
    }
  }

  return wormCount;
};

// 표준 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const t = parseInt(input[0], 10); // 테스트 케이스 개수
  let index = 1;

  const results = [];
  for (let tc = 0; tc < t; tc++) {
    const [m, n, k] = input[index].split(' ').map(Number); // M, N, K 입력
    index++;

    // 배추밭 초기화
    const field = Array.from({ length: n }, () => Array(m).fill(0));

    // 배추 위치 입력
    for (let i = 0; i < k; i++) {
      const [x, y] = input[index].split(' ').map(Number);
      field[y][x] = 1; // 배추 위치 표시
      index++;
    }

    // 지렁이 수 계산
    const wormCount = countWorms(field, n, m);
    results.push(wormCount);
  }

  // 결과 출력
  console.log(results.join('\n'));
});
