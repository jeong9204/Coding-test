const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  // 첫 줄은 과목 수, 두 번째 줄은 점수 배열
  const N = parseInt(input[0]);
  const scores = input[1].split(" ").map(Number);

  // 최대값 찾기
  const maxScore = Math.max(...scores);

  // 새로운 점수 계산 및 평균 구하기
  const newScores = scores.map(score => (score / maxScore) * 100);
  const newAverage = newScores.reduce((sum, score) => sum + score, 0) / N;

  console.log(newAverage);
});
