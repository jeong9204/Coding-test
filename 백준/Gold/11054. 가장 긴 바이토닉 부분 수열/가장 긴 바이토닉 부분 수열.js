const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let a = [];

rl.on("line", (line) => {
  if (n === 0) {
    n = parseInt(line);
  } else {
    a = line.split(" ").map(Number);
    rl.close();
  }
});

rl.on("close", () => {
  const dp_up = Array(n).fill(1);    // 왼쪽부터 증가하는 부분 수열
  const dp_down = Array(n).fill(1);  // 오른쪽부터 감소하는 부분 수열

  // 왼쪽부터 증가하는 부분 수열 계산
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (a[j] < a[i]) {
        dp_up[i] = Math.max(dp_up[i], dp_up[j] + 1);
      }
    }
  }

  // 오른쪽부터 감소하는 부분 수열 계산
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (a[j] < a[i]) {
        dp_down[i] = Math.max(dp_down[i], dp_down[j] + 1);
      }
    }
  }

  // 최대 바이토닉 부분 수열 길이 계산
  let maxLen = 0;
  for (let i = 0; i < n; i++) {
    maxLen = Math.max(maxLen, dp_up[i] + dp_down[i] - 1);
  }

  console.log(maxLen);
});
