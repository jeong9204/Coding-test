const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const N = Number(input[0]);  // 상근이가 가진 숫자 카드 개수
    const cardNumbers = input[1].split(' ').map(Number);  // 카드 숫자 리스트
    const M = Number(input[2]);  // 찾아야 할 숫자 개수
    const queryNumbers = input[3].split(' ').map(Number); // 찾아야 할 숫자 리스트

    // 🔹 카드 숫자 개수를 저장할 해시맵 생성
    const countMap = new Map();
    for (let num of cardNumbers) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }

    // 🔹 찾을 숫자들의 개수 출력
    const result = queryNumbers.map(num => countMap.get(num) || 0);
    console.log(result.join(' '));
});
