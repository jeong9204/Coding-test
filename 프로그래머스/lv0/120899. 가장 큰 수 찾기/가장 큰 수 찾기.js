function solution(array) {
    let answer = Object.entries(array);
    let sort = answer.sort((a,b) => b[1] - a[1]);
    return [+sort[0][1], +sort[0][0]]
}