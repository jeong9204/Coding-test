const readline = require('readline');

// readline 인터페이스를 생성합니다.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (num) => {
    let remainder = 0n;
    const MOD = 20000303n;

    for (let i = 0; i < num.length; i++) {
        remainder = (remainder * 10n + BigInt(num[i])) % MOD;
    }

    console.log(remainder.toString());
    rl.close();
});