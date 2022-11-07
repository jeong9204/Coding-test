function solution(price, money, count) {
    var answer = 0;
    let arr = [];
    for(let i=1; i<=count; i++) {
        arr.push(price*i)
    }
    answer = arr.reduce((a,b) => a+b,0)
    
    return (money - answer) > 0 ? 0 : answer - money;
}