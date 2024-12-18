const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [M, N] = line.split(" ").map(Number); // 입력값 M과 N
  const primes = Array(N + 1).fill(true); // N까지의 숫자를 소수로 초기화
  primes[0] = primes[1] = false; // 0과 1은 소수가 아님

  // 에라토스테네스의 체 알고리즘
  for (let i = 2; i * i <= N; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= N; j += i) {
        primes[j] = false; // i의 배수는 소수가 아님
      }
    }
  }

  // M 이상 N 이하의 소수 출력
  const result = [];
  for (let i = M; i <= N; i++) {
    if (primes[i]) {
      result.push(i);
    }
  }

  console.log(result.join("\n")); // 소수 출력
  rl.close();
});
