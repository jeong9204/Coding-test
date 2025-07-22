const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on("line", (line) => {
  input.push(line.trim());
  if (input.length === 2) {
    rl.close();
  }
});

rl.on("close", () => {
  // 현재 시각 A(시), B(분), C(초)
  let [A, B, C] = input[0].split(" ").map(Number);
  let D = Number(input[1]); // 요리 시간(초)

  // 현재 시각을 총 초 단위로 환산
  let totalSeconds = A * 3600 + B * 60 + C + D;

  // 시, 분, 초로 다시 환산
  let hour = Math.floor(totalSeconds / 3600) % 24;
  let minute = Math.floor((totalSeconds % 3600) / 60);
  let second = totalSeconds % 60;

  console.log(`${hour} ${minute} ${second}`);
});
