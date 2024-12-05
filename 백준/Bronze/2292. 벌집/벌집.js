// 입력을 처리하는 부분
const fs = require('fs');
const input = parseInt(fs.readFileSync('/dev/stdin').toString().trim());

// N번 방까지 최소 방의 개수를 계산하는 함수
function findStepsToRoom(n) {
    if (n === 1) return 1; // 방 번호가 1이면 시작점이므로 1개만 필요
    
    let layer = 1; // 현재 벌집 층수 (중심부는 1층)
    let range = 1; // 현재 층의 최대 번호

    // 벌집 범위를 넘을 때까지 층수를 늘림
    while (range < n) {
        range += 6 * layer; // 각 층은 6개의 방이 추가됨
        layer++;
    }

    return layer;
}

// 결과 출력
console.log(findStepsToRoom(input));
