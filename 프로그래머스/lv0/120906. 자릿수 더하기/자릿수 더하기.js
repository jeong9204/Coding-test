function solution(n) {
    return [...(n+'')].reduce((a,b) => {
        return +a + +b
    },0);
}