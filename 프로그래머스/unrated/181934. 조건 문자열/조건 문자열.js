function solution(ineq, eq, n, m) {
    var answer = 0;
    if(ineq === '>' && n>=m || ineq === '<' && n<=m) {
        return 1
    }
    return answer;
}