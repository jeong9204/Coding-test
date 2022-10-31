function solution(x) {
    var answer = true;
    
    let arr = (x+'').split('').map(Number);
    let sum = arr.reduce((a,b) => a+b);
    
    if(x % sum !== 0) {
        answer = false;
    } else {
        answer = true;
    }
    
    return answer;
}