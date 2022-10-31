function solution(n) {
    var answer = 0;
    let sqrt = Math.sqrt(n) % 1 === 0 ? Math.sqrt(n) : 0;
    if(n === Math.pow(sqrt,2)) {
        answer = Math.pow(sqrt + 1,2);
    } else {
        answer = -1
    }
    return answer;
}