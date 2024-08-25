const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputs = [];

rl.on('line', (line) => {
    inputs.push(line);
    if (inputs.length === 3) {
        // 첫 번째 입력은 무시하고, 두 번째와 세 번째 입력을 곱한다
        let result = BigInt(inputs[1]) * BigInt(inputs[2]);
        console.log(result.toString()); // 결과 출력
        rl.close();
    }
});
