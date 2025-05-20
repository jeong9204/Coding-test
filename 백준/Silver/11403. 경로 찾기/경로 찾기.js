const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const graph = input.slice(1).map(line => line.split(' ').map(Number));

// Floyd-Warshall for reachability
for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][k] === 1 && graph[k][j] === 1) {
        graph[i][j] = 1;
      }
    }
  }
}

// 출력
const result = graph.map(row => row.join(' ')).join('\n');
console.log(result);
