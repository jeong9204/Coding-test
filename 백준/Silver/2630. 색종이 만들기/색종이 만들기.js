const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const paper = input.slice(1).map(line => line.split(' ').map(Number));

let white = 0;
let blue = 0;

function countColors(x, y, size) {
    const color = paper[x][y];
    let same = true;

    for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
            if (paper[i][j] !== color) {
                same = false;
                break;
            }
        }
        if (!same) break;
    }

    if (same) {
        if (color === 0) white++;
        else blue++;
    } else {
        const half = size / 2;
        countColors(x, y, half);
        countColors(x, y + half, half);
        countColors(x + half, y, half);
        countColors(x + half, y + half, half);
    }
}

countColors(0, 0, N);
console.log(white);
console.log(blue);
