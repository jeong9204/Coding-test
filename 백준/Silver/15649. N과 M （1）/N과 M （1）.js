const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const [N, M] = line.split(" ").map(Number);
  const result = [];
  const visited = Array(N + 1).fill(false);

  function dfs(sequence) {
    if (sequence.length === M) {
      result.push(sequence.join(" "));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        dfs([...sequence, i]);
        visited[i] = false;
      }
    }
  }

  dfs([]);
  console.log(result.join("\n"));
  rl.close();
});
