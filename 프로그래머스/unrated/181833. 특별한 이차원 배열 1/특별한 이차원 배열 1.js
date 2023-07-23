function solution(n) {
    var answer = []
    for(let i=0; i<n; i++) {
        answer.push([])
        for(let j=0; j<n; j++) {
            if(i===j) {
                answer[i].push(1)
            } else {
                answer[i].push(0)
            }
        }
    }
    return answer;
}