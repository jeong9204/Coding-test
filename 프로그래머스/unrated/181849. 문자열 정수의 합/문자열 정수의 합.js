function solution(num_str) {
    let arr = num_str.split('')
    return arr.reduce((a,b) => +a + +b,0)
}