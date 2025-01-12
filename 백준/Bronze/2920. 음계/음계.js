const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const notes = line.split(" ").map(Number); // 입력받은 숫자를 배열로 변환
  const ascending = [1, 2, 3, 4, 5, 6, 7, 8]; // 오름차순 기준 배열
  const descending = [8, 7, 6, 5, 4, 3, 2, 1]; // 내림차순 기준 배열

  if (JSON.stringify(notes) === JSON.stringify(ascending)) {
    console.log("ascending");
  } else if (JSON.stringify(notes) === JSON.stringify(descending)) {
    console.log("descending");
  } else {
    console.log("mixed");
  }

  rl.close();
});
