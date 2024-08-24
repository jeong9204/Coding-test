// 입력
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (N) => {
    // 출력
    for (let i = 0; i < parseInt(N); i++) {
        console.log("SciComLove");
    }
    rl.close();
});
