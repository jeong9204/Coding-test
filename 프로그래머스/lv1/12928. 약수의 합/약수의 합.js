function solution(n) {
    var answer = 0;
    
    let arr = [];
    for(let i=1; i<=n; i++) {
        if(n % i === 0) arr.push(i);
    }
    answer = arr.reduce((a,b) => a+b,0)
    
    return answer;
}