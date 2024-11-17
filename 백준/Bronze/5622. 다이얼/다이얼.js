// 입력을 받는 부분 (Node.js 실행 환경에서는 readline 모듈 사용)
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line) => {
    // 알파벳별로 다이얼에 걸리는 시간 매핑
    const dial = {
        A: 3, B: 3, C: 3,
        D: 4, E: 4, F: 4,
        G: 5, H: 5, I: 5,
        J: 6, K: 6, L: 6,
        M: 7, N: 7, O: 7,
        P: 8, Q: 8, R: 8, S: 8,
        T: 9, U: 9, V: 9,
        W: 10, X: 10, Y: 10, Z: 10,
    };

    // 단어를 순회하며 각 문자에 해당하는 시간을 더함
    let totalTime = 0;
    for (const char of line) {
        totalTime += dial[char];
    }

    // 결과 출력
    console.log(totalTime);

    rl.close();
});
