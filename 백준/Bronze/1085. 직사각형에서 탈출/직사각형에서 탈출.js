const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  // 입력 처리
  const [x, y, w, h] = line.split(" ").map(Number);

  // 각각의 경계선까지의 거리 계산
  const toLeft = x; // x 좌표에서 왼쪽 경계선까지의 거리
  const toRight = w - x; // x 좌표에서 오른쪽 경계선까지의 거리
  const toBottom = y; // y 좌표에서 아래쪽 경계선까지의 거리
  const toTop = h - y; // y 좌표에서 위쪽 경계선까지의 거리

  // 최소 거리 계산
  const minDistance = Math.min(toLeft, toRight, toBottom, toTop);

  console.log(minDistance); // 결과 출력
  rl.close();
});
