function solution(k, d) {
    var answer = 0;
    for(let x=0;x<=d;x=x+k){
        answer += (Math.floor(Math.floor(Math.sqrt(Math.pow(d,2) - Math.pow(x,2))) / k) + 1)
    }
    return answer;
}