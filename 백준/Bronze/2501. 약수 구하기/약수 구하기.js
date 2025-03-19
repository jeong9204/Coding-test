const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    let [N, K] = input.split(' ').map(Number);
    
    let divisors = [];
    
    // 1부터 N까지 돌면서 약수 찾기
    for (let i = 1; i <= N; i++) {
        if (N % i === 0) {
            divisors.push(i);
        }
    }

    // K번째 약수 출력 (없으면 0 출력)
    console.log(divisors[K - 1] || 0);
    
    rl.close();
});
