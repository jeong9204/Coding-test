function solution(answers) {
    let result = [];

    const one = [1, 2, 3, 4, 5];
    const two = [2, 1, 2, 3, 2, 4, 2, 5];
    const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    let score = [0, 0, 0];

    for (let i = 0; i < answers.length; i++) {
        if (one[i % 5] === answers[i]) {
            score[0]++;
        }
        if (two[i % 8] === answers[i]) {
            score[1]++;
        }
        if (three[i % 10] === answers[i]) {
            score[2]++;
        }
    }

    for (let i = 0; i < score.length; i++) {
        if (Math.max(...score) === score[i]) {
            result.push(i + 1);
        }
    }

    return result;
}