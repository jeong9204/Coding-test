const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [N, K] = line.split(" ").map(Number);
  console.log(josephus(N, K));
  rl.close();
});

function josephus(N, K) {
  const queue = Array.from({ length: N }, (_, i) => i + 1);
  const result = [];
  let index = 0;

  while (queue.length > 0) {
    index = (index + K - 1) % queue.length; // K번째 사람을 찾기 위한 인덱스 계산
    result.push(queue.splice(index, 1)[0]); // 해당 인덱스 사람 제거 및 결과 저장
  }

  return `<${result.join(", ")}>`; // 결과 포맷 맞추기
}
