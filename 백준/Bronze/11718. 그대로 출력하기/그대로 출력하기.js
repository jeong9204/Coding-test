// Node.js의 readline 모듈을 사용하여 입력을 처리
const readline = require('readline');

// readline 인터페이스 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 입력 데이터를 저장할 배열
const input = [];

// 입력을 한 줄씩 처리
rl.on('line', (line) => {
    input.push(line); // 입력 받은 줄을 배열에 추가
}).on('close', () => {
    // 입력 종료 후 처리
    input.forEach((line) => {
        console.log(line); // 입력받은 각 줄을 그대로 출력
    });
});
