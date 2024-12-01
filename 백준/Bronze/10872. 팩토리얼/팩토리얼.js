// 팩토리얼을 계산하는 함수
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 입력 처리
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('', (input) => {
    const n = parseInt(input); // 입력값을 정수로 변환
    if (n >= 0 && n <= 12) {
        console.log(factorial(n)); // 팩토리얼 결과 출력
    } else {
        console.log('입력 값은 0 이상 12 이하의 정수여야 합니다.');
    }
    rl.close(); // 입력 종료
});
