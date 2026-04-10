const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let idx = 0;
const [N, M, K] = input[idx++].split(' ').map(Number);

// 겨울에 추가되는 양분
const addNutrients = [];
for (let i = 0; i < N; i++) {
  addNutrients.push(input[idx++].split(' ').map(Number));
}

// 현재 땅의 양분 (처음에는 모두 5)
const nutrients = Array.from({ length: N }, () => Array(N).fill(5));

// 각 칸의 나무들
const trees = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

// 초기 나무 입력
for (let i = 0; i < M; i++) {
  const [x, y, age] = input[idx++].split(' ').map(Number);
  trees[x - 1][y - 1].push(age);
}

// 혹시 여러 나무가 한 칸에 있을 수도 있으니 정렬
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    trees[i][j].sort((a, b) => a - b);
  }
}

const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

for (let year = 0; year < K; year++) {
  // 가을 번식을 위해 각 칸에서 번식하는 나무 수를 저장
  const breedCount = Array.from({ length: N }, () => Array(N).fill(0));

  // 1. 봄 + 여름
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (trees[i][j].length === 0) continue;

      const currentTrees = trees[i][j];
      const survived = [];
      let deadNutrients = 0;

      for (let t = 0; t < currentTrees.length; t++) {
        const age = currentTrees[t];

        if (nutrients[i][j] >= age) {
          nutrients[i][j] -= age;
          const newAge = age + 1;
          survived.push(newAge);

          if (newAge % 5 === 0) {
            breedCount[i][j]++;
          }
        } else {
          deadNutrients += Math.floor(age / 2);
        }
      }

      nutrients[i][j] += deadNutrients;
      trees[i][j] = survived;
    }
  }

  // 2. 가을
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (breedCount[i][j] === 0) continue;

      const count = breedCount[i][j];

      for (let dir = 0; dir < 8; dir++) {
        const ni = i + dx[dir];
        const nj = j + dy[dir];

        if (ni < 0 || ni >= N || nj < 0 || nj >= N) continue;

        // 새로 생기는 나무는 나이 1이므로 가장 앞에 와야 한다.
        trees[ni][nj] = new Array(count).fill(1).concat(trees[ni][nj]);
      }
    }
  }

  // 3. 겨울
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      nutrients[i][j] += addNutrients[i][j];
    }
  }
}

// 살아있는 나무 수 세기
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer += trees[i][j].length;
  }
}

console.log(answer);