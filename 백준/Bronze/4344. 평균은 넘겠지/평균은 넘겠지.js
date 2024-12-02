const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let input = [];
rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {
    const testCaseCount = parseInt(input[0]); // 첫 줄: 테스트 케이스의 개수
    let results = [];

    for (let i = 1; i <= testCaseCount; i++) {
        const scores = input[i].split(' ').map(Number); // 각 줄의 점수 배열
        const studentCount = scores[0]; // 첫 번째 숫자는 학생 수
        const studentScores = scores.slice(1); // 점수들만 추출

        const average =
            studentScores.reduce((sum, score) => sum + score, 0) / studentCount;

        const aboveAverageCount = studentScores.filter(
            (score) => score > average
        ).length;

        const percentage = ((aboveAverageCount / studentCount) * 100).toFixed(3);
        results.push(`${percentage}%`);
    }

    console.log(results.join('\n'));
});
