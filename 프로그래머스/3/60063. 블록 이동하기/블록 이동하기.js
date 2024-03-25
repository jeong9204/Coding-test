function solution(board) {
    const r = board.length;
    const c = board[0].length;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    
    const visited = new Map();
    const queue = [[0, 0, 0, 1, 0, 0]]; // x1,y1,x2,y2,shape,depth
    visited.set([0, 0, 0, 1].toString(), 0);
    
    while (queue.length > 0) {
        const [x1, y1, x2, y2, shape, cost] = queue.shift();
        
        if (x2 === r - 1 && y2 === c - 1) {
            return cost;
        }
        
        // move
        for (let i = 0; i < 4; i++) {
            const nx1 = x1 + dx[i];
            const ny1 = y1 + dy[i];
            const nx2 = x2 + dx[i];
            const ny2 = y2 + dy[i];
            
            if (!(0 <= nx1 && nx1 < r && 0 <= ny1 && ny1 < c) ||
                !(0 <= nx2 && nx2 < r && 0 <= ny2 && ny2 < c) ||
                board[nx1][ny1] === 1 || board[nx2][ny2] === 1) {
                continue;
            }
            
            const key = [nx1, ny1, nx2, ny2].toString();
            if (!visited.has(key) || visited.get(key) > cost + 1) {
                visited.set(key, cost + 1);
                queue.push([nx1, ny1, nx2, ny2, shape, cost + 1]);
            }
        }
        
        // rotate 'ㅡ' shape
        const npts = (shape === 0) ? [
            [x1 - 1, y1, x1, y1, x2 - 1, y2],
            [x1, y1, x1 + 1, y1, x2 + 1, y2],
            [x2 - 1, y2, x2, y2, x1 - 1, y1],
            [x2, y2, x2 + 1, y2, x1 + 1, y1]
        ] : [
            // rotate 'ㅣ' shape
            [x1, y1 - 1, x1, y1, x2, y2 - 1],
            [x1, y1, x1, y1 + 1, x2, y2 + 1],
            [x2, y2 - 1, x2, y2, x1, y1 - 1],
            [x2, y2, x2, y2 + 1, x1, y1 + 1]
        ];
        
        for (const [nx1, ny1, nx2, ny2, chx, chy] of npts) {
            if (!(0 <= nx1 && nx1 < r && 0 <= ny1 && ny1 < c) ||
                !(0 <= nx2 && nx2 < r && 0 <= ny2 && ny2 < c) ||
                !(0 <= chx && chx < r && 0 <= chy && chy < c) ||
                board[nx1][ny1] === 1 || board[nx2][ny2] === 1 || board[chx][chy] === 1) {
                continue;
            }
            
            const key = [nx1, ny1, nx2, ny2].toString();
            if (!visited.has(key) || visited.get(key) > cost + 1) {
                visited.set(key, cost + 1);
                queue.push([nx1, ny1, nx2, ny2, (shape === 0) ? 1 : 0, cost + 1]);
            }
        }
    }
    
    return answer;
}
