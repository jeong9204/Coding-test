function solution(arr) {
    // 문자열을 숫자와 연산자로 분리하여 저장할 배열
    const numbers = [];
    const operators = [];

    // 숫자와 연산자로 분리하여 배열에 저장
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+' || arr[i] === '-') {
            numbers.push(num);
            operators.push(arr[i]);
            num = 0;
        } else {
            num = num * 10 + parseInt(arr[i]);
        }
    }
    numbers.push(num); // 마지막 숫자 추가

    // 동적 계획법을 위한 2차원 배열 초기화
    const minDP = new Array(numbers.length).fill(null).map(() => new Array(numbers.length).fill(0));
    const maxDP = new Array(numbers.length).fill(null).map(() => new Array(numbers.length).fill(0));

    // 각 구간에서의 최대값과 최소값 계산
    for (let len = 1; len <= numbers.length; len++) {
        for (let start = 0; start + len <= numbers.length; start++) {
            const end = start + len - 1;
            if (len === 1) {
                minDP[start][end] = numbers[start];
                maxDP[start][end] = numbers[start];
            } else {
                minDP[start][end] = Infinity;
                maxDP[start][end] = -Infinity;
                for (let k = start; k < end; k++) {
                    const op = operators[k];
                    if (op === '+') {
                        minDP[start][end] = Math.min(minDP[start][end], minDP[start][k] + minDP[k + 1][end]);
                        maxDP[start][end] = Math.max(maxDP[start][end], maxDP[start][k] + maxDP[k + 1][end]);
                    } else {
                        minDP[start][end] = Math.min(minDP[start][end], minDP[start][k] - maxDP[k + 1][end]);
                        maxDP[start][end] = Math.max(maxDP[start][end], maxDP[start][k] - minDP[k + 1][end]);
                    }
                }
            }
        }
    }

    // 전체 표현식에 대한 최대값 반환
    return maxDP[0][numbers.length - 1];
}
