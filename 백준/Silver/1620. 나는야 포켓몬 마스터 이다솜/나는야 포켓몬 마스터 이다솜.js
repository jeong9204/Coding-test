const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [N, M] = input[0].split(" ").map(Number); // 포켓몬 개수와 문제 개수
  const nameToNumber = new Map(); // 포켓몬 이름 → 번호 맵
  const numberToName = new Map(); // 포켓몬 번호 → 이름 맵

  // 포켓몬 도감 저장
  for (let i = 1; i <= N; i++) {
    const name = input[i];
    nameToNumber.set(name, i);
    numberToName.set(i, name);
  }

  let result = [];
  // 문제 해결
  for (let i = N + 1; i <= N + M; i++) {
    const query = input[i];

    if (isNaN(query)) {
      // 문자인 경우 (이름이 들어온 경우)
      result.push(nameToNumber.get(query));
    } else {
      // 숫자인 경우 (번호가 들어온 경우)
      result.push(numberToName.get(Number(query)));
    }
  }

  console.log(result.join("\n")); // 빠른 출력
});
