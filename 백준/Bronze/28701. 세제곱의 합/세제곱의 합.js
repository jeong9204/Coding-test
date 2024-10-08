const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (n) => {
    n = parseInt(n);
    
    // 합계
    const sum = n * (n + 1) / 2;
    
    // 합계의 제곱
    const sumSqrd = sum * sum;
    
    // 합계의 세제곱
    let sumOfCubed = 0;
    for (let i = 1; i <= n; i++) {
        sumOfCubed += Math.pow(i, 3);
    }
    
    // 결과 출력
    console.log(sum);
    console.log(sumSqrd);
    console.log(sumOfCubed);

    rl.close();
});
