function solution(n) {
    var answer = 0;
    let a = 2, b = 1;
    for(let i = 2; i < n; i++){
        answer = (a + b) % 1000000007;
        b = a;
        a = answer;
    }
    return answer;
}