function solution(number) {
    var answer = [...number].reduce((a,b) => +a + +b,0);
    return answer%9;
}