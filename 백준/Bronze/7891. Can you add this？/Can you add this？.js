const readline = require('readline');

// readline 인터페이스를 생성합니다.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let index = 0;

// 입력을 배열에 저장합니다.
rl.on('line', (line) => {
    input.push(line);
});

// 입력이 끝나면 처리합니다.
rl.on('close', () => {
    let t = parseInt(input[index++]);

    for (let i = 0; i < t; i++) {
        let [a, b] = input[index++].split(' ').map(Number);
        console.log(a + b);
    }
});
