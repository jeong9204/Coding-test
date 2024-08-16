const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    n = parseInt(n);  // 입력된 값을 정수로 변환
    console.log(n - 1946);  // n에서 1946을 뺀 값을 출력
    rl.close();
});
