// d(n) 함수: 숫자 n과 각 자리수를 더한 값을 반환
function d(n) {
    return n + n.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

// 셀프 넘버 계산
function findSelfNumbers(limit) {
    const isNotSelfNumber = Array(limit + 1).fill(false);

    // 모든 숫자에 대해 d(n) 값을 계산하여 셀프 넘버가 아닌 숫자를 마킹
    for (let i = 1; i <= limit; i++) {
        const dn = d(i);
        if (dn <= limit) {
            isNotSelfNumber[dn] = true;
        }
    }

    // 셀프 넘버를 출력
    const result = [];
    for (let i = 1; i <= limit; i++) {
        if (!isNotSelfNumber[i]) {
            result.push(i);
        }
    }
    return result;
}

// 실행
const limit = 10000;
const selfNumbers = findSelfNumbers(limit);

// 결과 출력
selfNumbers.forEach(num => console.log(num));
