function solution(brown, yellow) {
    let answer = [];
    let a = parseInt((brown - 4) / 2);
    for (let i = 1; i <= parseInt((a + 1) / 2); i++) {
        if (i * (a - i) == yellow) {
            answer.push(a - i + 2);
            answer.push(i + 2);
            break;
        }
    }
    return answer;
}

