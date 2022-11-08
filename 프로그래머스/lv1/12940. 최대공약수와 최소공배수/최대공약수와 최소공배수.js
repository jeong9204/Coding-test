function solution(n, m) {
    var gcd = 0;
    let minNum = n>m ? m : n;
    let maxNum = n>m ? n : m;
    
    for(let i=minNum; i>=1; i--) {
        if(n % i === 0 && m % i === 0) {
            gcd = i
            break;
        }
    }
    return [gcd, ((n*m)/gcd)];
}