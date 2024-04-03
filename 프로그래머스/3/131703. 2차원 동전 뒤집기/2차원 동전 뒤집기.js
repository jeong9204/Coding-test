function compare(beginning, target, row, col) {
    for (let r = 0; r < beginning.length; r++) {
        for (let c = 0; c < beginning[0].length; c++) {
            const diff = ((row >> r) % 2 + ((col >> c) % 2)) % 2;
            if ((beginning[r][c] + diff) % 2 !== target[r][c]) {
                return false;
            }
        }
    }
    return true;
}

function solution(beginning, target) {
    const MAX = beginning.length * beginning[0].length + 1;
    let answer = MAX;
    for (let row = 0; row < 2 ** beginning.length; row++) {
        for (let col = 0; col < 2 ** beginning[0].length; col++) {
            const cnt = (row.toString(2).split('1').length - 1) + (col.toString(2).split('1').length - 1);
            if (cnt < answer && compare(beginning, target, row, col)) {
                answer = cnt;
            }
        }
    }
    return answer < MAX ? answer : -1;
}
