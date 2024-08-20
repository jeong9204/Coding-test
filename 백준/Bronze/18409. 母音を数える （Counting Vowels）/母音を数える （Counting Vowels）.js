const readline = require('readline');

// 모음 문자열을 정의
const vowels = "aeiou";

// 모음이 있는지 확인하는 함수
function hasVowel(c) {
    return vowels.includes(c);
}

// 입력을 받기 위해 readline 인터페이스 설정
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n;
let s;

// 입력 처리
rl.on('line', (line) => {
    if (!n) {
        // 첫 번째 입력은 n으로 저장
        n = parseInt(line.trim());
    } else {
        // 두 번째 입력은 s로 저장
        s = line.trim();

        // 주어진 문자열에서 모음의 개수를 계산
        let ans = 0;
        for (let i = 0; i < n; i++) {
            if (hasVowel(s[i])) {
                ans++;
            }
        }

        // 결과 출력
        console.log(ans);

        // 입력 종료
        rl.close();
    }
});
