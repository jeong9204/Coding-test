const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const [N, B] = line.split(' ').map((v, i) => i === 0 ? BigInt(v) : parseInt(v)); // N은 BigInt로 받아야 함
    let result = '';

    let num = N;

    while (num > 0n) {
        let remainder = num % BigInt(B);
        let char;

        if (remainder < 10n) {
            char = remainder.toString();
        } else {
            // 나머지가 10 이상이면 'A' 부터 시작해서 문자로 변환
            char = String.fromCharCode(Number(remainder) - 10 + 'A'.charCodeAt(0));
        }

        result = char + result;  // 앞쪽에 추가
        num = num / BigInt(B);
    }

    console.log(result);
    rl.close();
});
