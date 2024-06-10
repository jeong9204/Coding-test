const readline = require('readline');

// readline 인터페이스를 생성합니다.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 입력값을 저장할 배열을 만듭니다.
let input = [];

// 한 줄의 입력을 처리하는 이벤트 리스너를 추가합니다.
rl.on('line', (line) => {
    input.push(line);
    // 입력값이 3개일 때 인터페이스를 닫습니다.
    if (input.length === 3) {
        rl.close();
    }
});

// 모든 입력이 완료되었을 때 실행되는 이벤트 리스너를 추가합니다.
rl.on('close', () => {
    // 각 입력값을 정수로 변환합니다.
    let a = parseInt(input[0]);
    let b = parseInt(input[1]);
    let c = parseInt(input[2]);

    // 두 정수를 문자열로 결합합니다.
    let d = '';
    d += a;
    d += b;

    // 결합된 문자열을 정수로 변환합니다.
    let e = parseInt(d);

    // 결과를 출력합니다.
    console.log(a + b - c);
    console.log(e - c);
});
