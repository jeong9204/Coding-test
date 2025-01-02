function findFraction(X) {
    let line = 1; // 현재 라인의 번호
    let count = 0; // 현재까지 몇 개의 분수를 지나왔는지 카운트

    // X가 해당 라인에 있는지 찾기 위해 반복
    while (count < X) {
        count += line; // 현재 라인의 분수 개수를 더함
        line++; // 다음 라인으로 이동
    }

    // 이전 라인에서 넘어온 만큼 줄여서 X 위치 계산
    line--; // 마지막 증가를 되돌림
    count -= line; // X가 포함된 라인의 시작점으로 초기화

    let position = X - count; // X번째 분수의 위치 (1부터 시작)

    // line의 홀짝에 따라 분수 계산
    let numerator, denominator;
    if (line % 2 === 0) {
        // 짝수 라인: 분자는 작은 값에서 시작, 분모는 큰 값에서 시작
        numerator = position;
        denominator = line - position + 1;
    } else {
        // 홀수 라인: 분자는 큰 값에서 시작, 분모는 작은 값에서 시작
        numerator = line - position + 1;
        denominator = position;
    }

    return `${numerator}/${denominator}`;
}

// 입력 처리 및 실행
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const X = parseInt(input, 10);
console.log(findFraction(X));
