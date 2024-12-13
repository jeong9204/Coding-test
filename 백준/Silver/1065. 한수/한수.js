function isHansu(number) {
    const digits = String(number).split("").map(Number);
    if (digits.length <= 2) return true; // 한 자릿수나 두 자릿수는 모두 한수
    const diff = digits[1] - digits[0];
    for (let i = 2; i < digits.length; i++) {
        if (digits[i] - digits[i - 1] !== diff) {
            return false;
        }
    }
    return true;
}

function countHansu(N) {
    let count = 0;
    for (let i = 1; i <= N; i++) {
        if (isHansu(i)) count++;
    }
    return count;
}

// 입력값 처리
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const N = parseInt(input);

// 결과 출력
console.log(countHansu(N));
