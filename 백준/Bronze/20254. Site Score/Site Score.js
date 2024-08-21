const readline = require('readline');

// 입력을 받기 위해 readline 인터페이스 설정
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 한 줄의 입력을 처리
rl.on('line', (line) => {
    const [Ur, Tr, Uo, To] = line.split(' ').map(Number);

    // 계산 및 결과 출력
    const result = 56 * Ur + 24 * Tr + 14 * Uo + 6 * To;
    console.log(result);

    // 입력 종료
    rl.close();
});
