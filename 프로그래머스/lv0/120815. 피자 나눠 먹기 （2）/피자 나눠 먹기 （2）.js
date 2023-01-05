function solution(n) {
    var answer = 0;
    let i=1;
    while(true) {
        if((6*i)%n === 0) {
            answer += i
            break;
        }
        i++
    }
    return answer;
}