const fs = require('fs');

// 입력값 가져오기 (표준 입력)
const input = parseInt(fs.readFileSync('/dev/stdin').toString().trim(), 10);

// 설탕 봉지 계산 함수
function minBagsOfSugar(n) {
    let count = 0;

    // 5킬로그램 봉지로 최대한 배달하고 나머지는 3킬로그램으로 처리
    while (n >= 0) {
        // 5로 나누어떨어지는 경우
        if (n % 5 === 0) {
            count += n / 5; // 남은 킬로그램을 5로 나눈 값을 봉지 개수에 추가
            return count;
        }
        // 5로 나누어떨어지지 않으면 3킬로그램 봉지를 사용
        n -= 3;
        count++;
    }

    // 정확히 나눌 수 없는 경우
    return -1;
}

console.log(minBagsOfSugar(input));
