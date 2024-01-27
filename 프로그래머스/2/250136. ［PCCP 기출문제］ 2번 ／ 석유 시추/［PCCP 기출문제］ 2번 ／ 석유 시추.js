function solution(land) {
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];
    const answerMap = new Map();

    const bfs = (map, now, ys, color) => {
        let size = 1;
        const queue = [now];
        ys.add(now[1]);
        map[now[0]][now[1]] = color;

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];
                if (nx >= 0 && nx < map.length && ny >= 0 && ny < map[0].length && map[nx][ny] === 1) {
                    map[nx][ny] = color;
                    queue.push([nx, ny]);
                    ys.add(ny);
                    size++;
                }
            }
        }

        for (const y of ys) {
            answerMap.set(y, (answerMap.get(y) || 0) + size);
        }
    };

    let color = 2;

    for (let i = 0; i < land.length; i++) {
        for (let j = 0; j < land[i].length; j++) {
            if (land[i][j] === 1) {
                const ys = new Set();
                bfs(land, [i, j], ys, color);
            }
        }
    }

    return Math.max(...Array.from(answerMap.values()));
}