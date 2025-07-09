const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const resultMap = {
    0: 'E', // 모 (등 4개)
    1: 'A', // 도 (배 1개)
    2: 'B', // 개 (배 2개)
    3: 'C', // 걸 (배 3개)
    4: 'D'  // 윷 (배 4개)
};

let input = [];

rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 3) {
        input.forEach(row => {
            const nums = row.split(' ').map(Number);
            const zeroCount = nums.filter(x => x === 0).length;
            console.log(resultMap[zeroCount]);
        });
        rl.close();
    }
});
