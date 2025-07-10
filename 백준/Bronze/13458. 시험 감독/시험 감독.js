const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const [B, C] = input[2].split(" ").map(Number);

let total = 0;

for (let i = 0; i < N; i++) {
  const students = A[i];

  // 총감독관은 한 시험장에 무조건 1명 필요
  total += 1;

  // 남은 학생 수 = 전체 학생 - 총감독관이 감시하는 인원
  const remaining = students - B;

  if (remaining > 0) {
    // 남은 학생들을 부감독관이 감시 (올림으로 나눔)
    total += Math.ceil(remaining / C);
  }
}

console.log(total);
