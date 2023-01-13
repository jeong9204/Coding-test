function solution(n) {
    var answer = [];
    let i=2
    while(i<=n) {
        if(n%i==0) {
            answer.push(i)
            n/=i
        } else {
            i += 1
        }
    }
    
    let arr = [...new Set(answer)].sort((a,b) => a-b)
    return arr;
}