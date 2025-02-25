const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0], 10);
  let count = 0;
  
  // 열, 대각선(좌상-우하, 우상-좌하) 사용 여부를 체크하는 배열
  const columns = new Array(N).fill(false);            // 각 열이 사용 중이면 true
  const diag1 = new Array(2 * N - 1).fill(false);          // (row - col + N - 1) 인덱스 사용
  const diag2 = new Array(2 * N - 1).fill(false);          // (row + col) 인덱스 사용
  
  // row번째 행에 퀸을 놓는 함수
  function dfs(row) {
    if (row === N) {
      // 모든 행에 퀸을 배치했다면 경우의 수 증가
      count++;
      return;
    }
    for (let col = 0; col < N; col++) {
      // 현재 열과 두 대각선에 퀸이 없으면 놓을 수 있음
      if (!columns[col] && !diag1[row - col + N - 1] && !diag2[row + col]) {
        // 현재 위치에 퀸 놓기
        columns[col] = true;
        diag1[row - col + N - 1] = true;
        diag2[row + col] = true;
        
        // 다음 행으로 진행
        dfs(row + 1);
        
        // 백트래킹: 놓았던 퀸 제거
        columns[col] = false;
        diag1[row - col + N - 1] = false;
        diag2[row + col] = false;
      }
    }
  }
  
  dfs(0);
  console.log(count);
});
