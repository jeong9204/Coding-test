const fs = require('fs');

// 입력 데이터 처리
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const T = parseInt(input[0]); // 테스트 케이스 개수
const results = [];

for (let i = 1; i <= T; i++) {
    const [H, W, N] = input[i].split(' ').map(Number);

    // 방 번호 계산
    const floor = (N % H === 0) ? H : (N % H); // 층 번호
    const room = Math.ceil(N / H);            // 호수 번호

    // 결과 저장
    results.push(`${floor}${room.toString().padStart(2, '0')}`);
}

// 결과 출력
console.log(results.join('\n'));
