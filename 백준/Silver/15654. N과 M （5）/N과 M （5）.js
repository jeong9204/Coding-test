const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number).sort((a, b) => a - b);

const visited = Array(N).fill(false);
const result = [];

function backtrack(sequence) {
    // 수열 길이가 M이 되면 출력
    if (sequence.length === M) {
        console.log(sequence.join(" "));
        return;
    }

    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            visited[i] = true;
            sequence.push(numbers[i]);
            backtrack(sequence);
            sequence.pop();
            visited[i] = false;
        }
    }
}

backtrack([]);
