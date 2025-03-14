const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();
const N = Number(input);

let result = [];
let count = 0;

function hanoi(n, from, to, aux) {
    if (n === 1) {
        result.push(`${from} ${to}`);
        count++;
        return;
    }
    
    hanoi(n - 1, from, aux, to); // 1단계: N-1개를 보조 기둥으로 이동
    result.push(`${from} ${to}`); // 2단계: 가장 큰 원판을 목표 기둥으로 이동
    count++;
    hanoi(n - 1, aux, to, from); // 3단계: 보조 기둥에 있는 N-1개를 목표 기둥으로 이동
}

// 하노이 탑 수행
hanoi(N, 1, 3, 2);

// 결과 출력
console.log(count);
console.log(result.join("\n"));
