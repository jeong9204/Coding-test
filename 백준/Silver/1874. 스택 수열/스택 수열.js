const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let sequence = [];
let index = 0;

rl.on("line", (line) => {
  if (index === 0) {
    n = parseInt(line);
  } else {
    sequence.push(parseInt(line));
  }
  index++;

  if (index > n) {
    rl.close();
  }
});

rl.on("close", () => {
  const stack = [];
  const operations = [];
  let current = 1;

  for (let i = 0; i < n; i++) {
    const target = sequence[i];

    // push until current matches target
    while (current <= target) {
      stack.push(current);
      operations.push("+");
      current++;
    }

    // pop if stack top matches target
    if (stack[stack.length - 1] === target) {
      stack.pop();
      operations.push("-");
    } else {
      console.log("NO");
      return;
    }
  }

  console.log(operations.join("\n"));
});
