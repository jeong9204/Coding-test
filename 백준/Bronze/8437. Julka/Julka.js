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
    input.push(line.trim());
    index++;

    // 두 개의 입력값을 모두 받으면 처리합니다.
    if (index === 2) {
        const a = BigInt(input[0]);
        const b = BigInt(input[1]);

        const c = (a + b) / 2n;
        const d = (a - b) / 2n;

        console.log(c.toString());
        console.log(d.toString());
        
        rl.close();
    }
});
