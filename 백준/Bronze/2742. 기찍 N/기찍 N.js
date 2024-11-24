const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
    const N = parseInt(line); // 입력받은 값을 숫자로 변환
    for (let i = N; i >= 1; i--) {
        console.log(i); // N부터 1까지 출력
    }
    rl.close(); // 입력 종료
});
