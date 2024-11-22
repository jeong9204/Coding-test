const fs = require('fs');

// 입력 처리
const input = (
    process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString().trim()
        : 'ljes=njak' // 로컬 테스트용 예제 입력
);

const croatianAlphabets = ['c=', 'c-', 'dz=', 'd-', 'lj', 'nj', 's=', 'z='];
let word = input;

// 크로아티아 알파벳을 '*'로 변환
for (const croatia of croatianAlphabets) {
    word = word.split(croatia).join('*');
}

// 최종 문자열의 길이 출력
console.log(word.length);
