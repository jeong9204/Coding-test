function solution(a, b, flag) {
    let answer = 0;
    if(flag === true) {
        answer = a+b
    } else if(flag === false) {
        answer = a-b
    }
    return answer;
}