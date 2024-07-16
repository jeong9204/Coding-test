const readline = require('readline');

// readline 인터페이스를 생성합니다.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 입력값을 저장할 배열을 만듭니다.
let lst = [];

// 3개의 입력을 받기 위한 카운터를 초기화합니다.
let count = 0;

// 한 줄의 입력을 처리하는 이벤트 리스너를 추가합니다.
rl.on('line', (input) => {
    lst.push(parseInt(input));
    count++;

    // 3개의 입력을 받으면 처리합니다.
    if (count === 3) {
        // 입력된 값을 정렬합니다.
        lst.sort((a, b) => a - b);
        
        // 두 번째 값을 출력합니다.
        console.log(lst[1]);
        
        // 인터페이스를 닫습니다.
        rl.close();
    }
});
