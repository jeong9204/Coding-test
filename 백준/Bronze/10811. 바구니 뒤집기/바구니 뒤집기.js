const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number); // N: 바구니 수, M: 연산 수
  let baskets = Array.from({ length: N }, (_, i) => i + 1); // 바구니 배열 초기화

  for (let i = 1; i <= M; i++) {
    const [start, end] = input[i].split(" ").map(Number);
    // start - 1과 end - 1을 통해 역순 변환할 인덱스를 설정합니다.
    const subArray = baskets.slice(start - 1, end).reverse(); // 부분 배열을 역순으로 만듭니다.
    baskets.splice(start - 1, end - start + 1, ...subArray); // 역순된 부분을 다시 삽입합니다.
  }

  console.log(baskets.join(" "));
});
