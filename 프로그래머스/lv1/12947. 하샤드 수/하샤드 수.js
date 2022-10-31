function solution(x) {
    
    let arr = (x+'').split('').map(Number);
    let sum = arr.reduce((a,b) => a+b);
    
    return x % sum == 0;
}