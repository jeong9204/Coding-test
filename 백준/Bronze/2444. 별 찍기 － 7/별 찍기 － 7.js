// 필요한 모듈을 가져옵니다.
const readline = require("readline");

// 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 입력 처리 및 결과 출력
rl.on("line", (line) => {
    const N = parseInt(line); // 입력받은 숫자를 정수로 변환

    // 상단 피라미드 출력
    for (let i = 1; i <= N; i++) {
        const spaces = " ".repeat(N - i); // 앞쪽 공백
        const stars = "*".repeat(2 * i - 1); // 별 출력
        console.log(spaces + stars);
    }

    // 하단 피라미드 출력
    for (let i = N - 1; i >= 1; i--) {
        const spaces = " ".repeat(N - i); // 앞쪽 공백
        const stars = "*".repeat(2 * i - 1); // 별 출력
        console.log(spaces + stars);
    }

    rl.close(); // 입력 종료
});
