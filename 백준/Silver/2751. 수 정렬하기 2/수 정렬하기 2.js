const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
    input.push(line);
}).on("close", () => {
    const N = parseInt(input[0]); // 첫 줄: 수의 개수
    const numbers = input.slice(1, N + 1).map(Number); // 두 번째 줄부터 N개의 숫자
    
    // 오름차순 정렬
    numbers.sort((a, b) => a - b);

    // 결과 출력
    console.log(numbers.join("\n"));
});
