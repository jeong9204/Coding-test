function solution(board) {
    function move(d, y, x) {
        while (true) {
            y += d[0];
            x += d[1];
            if (x < 0 || y < 0 || x >= x_max || y >= y_max) break;
            if (board[y][x] === 'D') break;
        }
        return [y - d[0], x - d[1]];
    }

    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const q = [];
    const x_max = board[0].length;
    const y_max = board.length;
    const vis = new Array(y_max).fill().map(() => new Array(x_max).fill(-1));

    for (let y = 0; y < y_max; y++) {
        for (let x = 0; x < x_max; x++) {
            if (board[y][x] === 'R') {
                q.push([y, x]);
                vis[y][x] = 0;
            }
            if (board[y][x] === 'G') {
                y_goal = y;
                x_goal = x;
            }
        }
    }

    while (q.length > 0) {
        const [y, x] = q.shift();
        for (const d of directions) {
            const [ny, nx] = move(d, y, x);
            if (vis[ny][nx] === -1) {
                q.push([ny, nx]);
                vis[ny][nx] = vis[y][x] + 1;
            }
        }
    }

    return vis[y_goal][x_goal];
}