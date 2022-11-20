function solution(n, k) {
    let num = Math.floor(n/10)*10
    if(num % 10 === 0) {
        let a = num/10
        console.log(a)
        return (n * 12000) + (k * 2000) - (a * 2000)
    }
    return (n * 12000) + (k * 2000)
    
}