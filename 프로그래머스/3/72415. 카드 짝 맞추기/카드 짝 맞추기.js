function Game(board) {
    this.board = board;
    this.pairMap = {};
    this.pairMap = {};
    this.pairs = new Set();
    this.minCnt = Infinity;
    this.init();
}

Game.prototype.init = function () {
    let pairs = new Map();
    for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[0].length; j++) {
            let val = this.board[i][j];
            if (val !== 0) {
                if (!pairs.has(val)) {
                    pairs.set(val, []);
                }
                pairs.get(val).push([i, j]);
            }
        }
    }

    for (let [a, b] of pairs.values()) {
        this.pairMap[a] = b;
        this.pairMap[b] = a;
        this.pairs.add(a);
        this.pairs.add(b);
    }
};

Game.prototype.isValidCoord = function (x, y) {
    return x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length;
};

Game.prototype.canPass = function (x, y, flipped) {
    return this.board[x][y] === 0 || flipped.has(x + "," + y);
};

Game.prototype.ctrlCoord = function (x, y, cx, cy, flipped) {
    while (this.isValidCoord(x + cx, y + cy)) {
        x += cx;
        y += cy;
        if (!this.canPass(x, y, flipped)) {
            return [x, y];
        }
    }
    return [x, y];
};

Game.prototype.normalCoord = function (x, y, cx, cy) {
    let nx = x + cx;
    let ny = y + cy;
    if (this.isValidCoord(nx, ny)) {
        x = nx;
        y = ny;
    }
    return [x, y];
};

Game.prototype.getMinCost = function (start, goal, flipped) {
    if (start[0] === goal[0] && start[1] === goal[1]) {
        return 0;
    }
    let visited = new Set();
    let check = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let queue = [[start, 0]];

    while (queue.length > 0) {
        let [xy, cnt] = queue.shift();
        let [x, y] = xy;

        for (let [cx, cy] of check) {
            let [nCoordX, nCoordY] = this.normalCoord(x, y, cx, cy);
            let [cCoordX, cCoordY] = this.ctrlCoord(x, y, cx, cy, flipped);

            for (let [coordX, coordY] of [[nCoordX, nCoordY], [cCoordX, cCoordY]]) {
                if (coordX === goal[0] && coordY === goal[1]) {
                    return cnt + 1;
                }
                let key = coordX + "," + coordY;
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push([[coordX, coordY], cnt + 1]);
                }
            }
        }
    }
    return 0;
};

Game.prototype.flip = function (xy, cnt, flipped) {
    let [x, y] = xy;
    if (this.board[x][y] !== 0 && !flipped.has(x + "," + y)) {
        let pxy = this.pairMap[x + "," + y];
        let cost = this.getMinCost(xy, pxy, flipped);
        this.dfsNotSelected(pxy, cnt + 2 + cost, new Set([...flipped, x + "," + y, pxy.join(",")]));
    }
};

Game.prototype.moveAndFlip = function (xy, cnt, flipped) {
    for (let dxy of this.pairs) {
        if (!flipped.has(dxy.join(","))) {
            let cost = this.getMinCost(xy, dxy, flipped);
            this.flip(dxy, cnt + cost, flipped);
        }
    }
};

Game.prototype.dfsNotSelected = function (xy, cnt, flipped) {
    if (flipped.size === this.pairs.size) {
        this.minCnt = Math.min(this.minCnt, cnt);
    }
    this.moveAndFlip(xy, cnt, flipped);
};

function solution(board, r, c) {
    let g = new Game(board);
    g.dfsNotSelected([r, c], 0, new Set());
    let answer = g.minCnt;

    return answer;
}
