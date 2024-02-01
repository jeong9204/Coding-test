function solution(grid) {
        const [row, col] = [grid.length, grid[0].length];
        const result = []; 
        let route = new Array(row).fill().map((_) => new Array(col).fill().map((_) => new Array(4).fill(0)));

        const dir = [[1, 0], [0, -1], [-1, 0], [0, 1]]; 

        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            for (let k = 0; k < dir.length; k++) { 
              if (route[i][j][k]) continue; 
              let start = [i, j, k]; 
              let [x, y, idx] = [i, j, k]; 
              let cnt = 0; 

              while (true) {
                if (route[x][y][idx]) { 
                  if (start[0] === x && start[1] === y && start[2] === idx) { 
                    result.push(cnt);
                  }
                  break; 
                }
                route[x][y][idx] = 1; 

                let [nx, ny] = [x + dir[idx][0], y + dir[idx][1]]; 

                if (nx < 0) nx = row - 1;
                else if (nx >= row) nx = 0;
                if (ny < 0) ny = col - 1;
                else if (ny >= col) ny = 0;

                if (grid[nx][ny] === 'R') idx = idx + 1 > 3 ? 0 : idx + 1;
                else if (grid[nx][ny] === 'L') idx = idx - 1 < 0 ? 3 : idx - 1;

                [x, y] = [nx, ny];
                cnt++; 
              }
            }
          }
        }
        return result.sort((a, b) => a - b); 
      }
