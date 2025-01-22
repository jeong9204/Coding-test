const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const N = parseInt(input[0]); // 사람의 수
  const people = input.slice(1).map((line) => line.split(' ').map(Number));
  const ranks = new Array(N).fill(1); // 모든 사람의 초기 등수를 1로 설정

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i !== j) {
        // (몸무게, 키) 모두 비교하여 i보다 큰 사람이 있으면 i의 등수 증가
        if (people[j][0] > people[i][0] && people[j][1] > people[i][1]) {
          ranks[i]++;
        }
      }
    }
  }

  console.log(ranks.join(' ')); // 등수를 공백으로 구분하여 출력
});
