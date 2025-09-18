// BOJ 15656 - N과 M (7)
// 조건: 중복 허용, 수열 길이 M, 사전순 출력
// 출력량 많으므로 stdout 버퍼링 사용

const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

let idx = 0;
const N = input[idx++];
const M = input[idx++];
const nums = input.slice(idx, idx + N).sort((a, b) => a - b);

const path = Array(M);
let result = [];
const FLUSH_SIZE = 5000; // 너무 커지지 않게 중간중간 flush

function dfs(depth) {
  if (depth === M) {
    result.push(path.join(" "));
    if (result.length >= FLUSH_SIZE) {
      process.stdout.write(result.join("\n") + "\n");
      result = [];
    }
    return;
  }
  for (let i = 0; i < N; i++) {
    path[depth] = nums[i];
    dfs(depth + 1);
  }
}

dfs(0);
if (result.length > 0) {
  process.stdout.write(result.join("\n") + "\n");
}
