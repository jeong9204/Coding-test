const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let scores = [];
rl.on('line', (line) => {
    scores.push(Number(line));
    if (scores.length === 5) {
        // 40점 미만인 점수를 40점으로 조정
        const adjustedScores = scores.map(score => score < 40 ? 40 : score);
        // 평균 계산 (항상 정수)
        const average = adjustedScores.reduce((sum, score) => sum + score, 0) / 5;
        console.log(average);
        rl.close();
    }
});
