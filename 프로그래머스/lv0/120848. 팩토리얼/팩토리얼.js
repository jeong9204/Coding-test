function solution(n) {
    let i = 0;
    let answer = 1;
    while(n>=answer) {
        i += 1
        answer = answer*i
    }
    answer = i-1
    return answer
}