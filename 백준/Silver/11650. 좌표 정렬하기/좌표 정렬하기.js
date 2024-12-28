const readline = require('readline');

// 입력을 처리하기 위한 readline 인터페이스 설정
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = []; // 입력 데이터를 저장할 배열

rl.on('line', (line) => {
    input.push(line); // 입력된 데이터를 배열에 저장
}).on('close', () => {
    const N = parseInt(input[0]); // 첫 번째 줄: 점의 개수
    const points = input.slice(1).map((line) => {
        const [x, y] = line.split(' ').map(Number);
        return { x, y }; // 각 점을 객체 형태로 변환
    });

    // 정렬 수행: x좌표 기준 오름차순, x좌표가 같으면 y좌표 기준 오름차순
    points.sort((a, b) => {
        if (a.x === b.x) {
            return a.y - b.y; // x좌표가 같으면 y좌표 기준 정렬
        }
        return a.x - b.x; // x좌표 기준 정렬
    });

    // 정렬 결과 출력
    points.forEach((point) => {
        console.log(point.x, point.y);
    });
});
