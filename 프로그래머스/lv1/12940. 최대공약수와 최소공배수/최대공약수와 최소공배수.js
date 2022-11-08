function solution(n, m) {
    let gcd = 0;
    let arr = [];
    let minNum = n>m ? m : n;
    let maxNum = n>m ? n : m;
    
    for(let i=minNum; i>=1; i--) {
        if(n % i === 0 && m % i === 0) {
            //gcd = i
            arr.push(i)
            break;
        }
    }
    for(let j=maxNum; maxNum<=(n*m); j++) {
        if(j%n === 0 && j%m === 0) {
            arr.push(j)
            break;
        }
    }
    return arr;
    //return [gcd, ((n*m)/gcd)];
}