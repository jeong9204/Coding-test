const readline = require("readline");

// 인터페이스 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 입력 처리
rl.on("line", (input) => {
    const word = input.trim(); // 입력된 단어에서 공백 제거

    // 팰린드롬 확인: 원래 문자열과 뒤집은 문자열을 비교
    const isPalindrome = word === word.split("").reverse().join("");

    // 결과 출력 (팰린드롬이면 1, 아니면 0)
    console.log(isPalindrome ? 1 : 0);

    rl.close(); // 입력 종료
});
