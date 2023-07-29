function solution(numLog) {
    var answer = '';
    for(let i=0; i<numLog.length; i++) {
        let a = numLog[i] - numLog[i-1]
        if(a === 1) {
            answer += 'w'
        } else if(a === 10) {
            answer += 'd'
        } else if(a === -1) {
            answer += 's'
        } else if(a === -10) {
            answer += 'a'
        }
    }
    return answer;
}