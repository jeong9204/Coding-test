class Node {
    constructor(y, x, moved, str) {
        this.y = y;
        this.x = x;
        this.moved = moved;
        this.str = str;
    }
}

class Queue {
    constructor() {
        this.left = [];
        this.right = [];
    }

    get isEmpty() {
        return this.left.length === 0 && this.right.length === 0;
    }

    append(data) {
        this.right.push(data);
    }

    pop() {
        if (this.left.length === 0) {
            this.left = this.right.reverse();
            this.right = [];
        }
        return this.left.pop();
    }
}

const dy = [0, -1, 1, 0];
const dx = [1, 0, 0, -1];

function solution(n, m, x, y, r, c, k) {
    const q = new Queue();
    const visited = Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }, () => Array(k + 1).fill(false)));
    q.append(new Node(y, x, 0, ""));
    visited[y][x][0] = true;

    while (!q.isEmpty) {
        const node = q.pop();
        const { y, x, moved, str } = node;

        if (y === c && x === r && moved === k) {
            return str;
        }

        if (moved === k) {
            continue;
        }

        for (let i = 0; i < 4; i++) {
            const ny = y + dy[i];
            const nx = x + dx[i];
            let dir = "l";
            if (i === 0) {
                dir = "d";
            } else if (i === 1) {
                dir = "l";
            } else if (i === 2) {
                dir = "r";
            } else if (i === 3) {
                dir = "u";
            }
            if (ny >= 1 && ny <= m && nx >= 1 && nx <= n && moved < k && !visited[ny][nx][moved + 1]) {
                visited[ny][nx][moved + 1] = true;
                q.append(new Node(ny, nx, moved + 1, str + dir));
            }
        }
    }
    return "impossible";
}
