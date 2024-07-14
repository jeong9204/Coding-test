const readline = require('readline');

// readline 인터페이스를 생성합니다.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 무한 루프를 위한 함수
function processInput() {
    rl.question('', (input) => {
        // 입력값을 정수로 변환합니다.
        const n = parseInt(input);

        // 입력값이 0이면 프로그램을 종료합니다.
        if (n === 0) {
            rl.close();
            return;
        }

        // 1부터 n까지 합을 계산합니다.
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }

        // 결과를 출력합니다.
        console.log(sum);

        // 다시 입력을 받기 위해 재귀 호출합니다.
        processInput();
    });
}

// 입력 처리 시작
processInput();
