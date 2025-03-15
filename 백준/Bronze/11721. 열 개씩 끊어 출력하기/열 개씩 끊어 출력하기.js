const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    for (let i = 0; i < input.length; i += 10) {
        console.log(input.slice(i, i + 10));  // 문자열을 10글자씩 자르기
    }
    rl.close();
});
