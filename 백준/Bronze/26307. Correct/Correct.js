const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const [HH, MM] = input.split(' ').map(Number);
    
    // 소요된 시간 계산 (단위: 분)
    const result = Math.abs(9 - HH) * 60 + Math.abs(0 - MM);
    
    console.log(result);
    rl.close();
});
