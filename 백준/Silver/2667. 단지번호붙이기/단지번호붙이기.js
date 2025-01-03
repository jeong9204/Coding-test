// 단지수를 구하는 함수
function findComplexes(N, map) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false)); // 방문 여부 배열
    const directions = [
        [0, 1],  // 오른쪽
        [1, 0],  // 아래쪽
        [0, -1], // 왼쪽
        [-1, 0], // 위쪽
    ];

    const bfs = (x, y) => {
        let count = 0; // 현재 단지의 집 개수
        const queue = [[x, y]];
        visited[x][y] = true;

        while (queue.length > 0) {
            const [curX, curY] = queue.shift();
            count++;

            for (const [dx, dy] of directions) {
                const nx = curX + dx;
                const ny = curY + dy;

                if (
                    nx >= 0 &&
                    ny >= 0 &&
                    nx < N &&
                    ny < N &&
                    !visited[nx][ny] &&
                    map[nx][ny] === 1
                ) {
                    visited[nx][ny] = true;
                    queue.push([nx, ny]);
                }
            }
        }

        return count;
    };

    const complexes = []; // 각 단지의 집 수를 저장
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (!visited[i][j] && map[i][j] === 1) {
                complexes.push(bfs(i, j)); // BFS로 탐색
            }
        }
    }

    complexes.sort((a, b) => a - b); // 결과를 오름차순 정렬
    return complexes;
}

// 입력 처리
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
    input.push(line.trim());
}).on("close", () => {
    const N = parseInt(input[0], 10); // 지도의 크기
    const map = input.slice(1).map((line) => line.split("").map(Number)); // 지도 배열

    const complexes = findComplexes(N, map);

    // 결과 출력
    console.log(complexes.length); // 총 단지 수
    complexes.forEach((count) => console.log(count)); // 각 단지의 집 수
});
