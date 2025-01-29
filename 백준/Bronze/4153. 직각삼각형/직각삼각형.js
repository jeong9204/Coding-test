const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  if (line === "0 0 0") {
    rl.close();
    return;
  }
  input.push(line);
});

rl.on("close", () => {
  input.forEach((line) => {
    const sides = line.split(" ").map(Number);
    sides.sort((a, b) => a - b); // 오름차순 정렬 (가장 긴 변이 마지막)

    const [a, b, c] = sides;
    
    if (a ** 2 + b ** 2 === c ** 2) {
      console.log("right");
    } else {
      console.log("wrong");
    }
  });
});
