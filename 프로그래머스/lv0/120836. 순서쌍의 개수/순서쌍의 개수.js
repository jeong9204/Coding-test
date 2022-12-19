function solution(n) {
    var answer = 0;
    //let num = Math.ceil(Math.sqrt(n))
    for(let i=0; i<=n; i++) {
        if(n%i===0) {
           answer+=1 
        }
    }
    return answer
}