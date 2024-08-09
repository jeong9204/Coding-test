const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('', (time) => {
    time = parseInt(time);  // 입력값을 정수로 변환
    let result = Math.floor(time / 5);  // 5로 나눈 몫을 계산

    if (time % 5 !== 0) {  // 나머지가 0이 아니면 결과값에 1을 더함
        result++;
    }

    console.log(result);  // 결과 출력
    rl.close();  // 입력 종료
});
