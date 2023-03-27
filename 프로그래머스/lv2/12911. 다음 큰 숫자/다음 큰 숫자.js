function solution(n) {
    let num = n.toString(2);
    let nCount = num.match(/1/g).length;
    let i = n+1;
    while(true) {
        if(i.toString(2).match(/1/g).length === nCount) break;
        i++
    }
    return i;
}