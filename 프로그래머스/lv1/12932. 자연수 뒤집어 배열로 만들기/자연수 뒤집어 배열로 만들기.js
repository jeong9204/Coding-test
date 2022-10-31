function solution(n) {
    var answer = [];
    answer = n.toString().split('').map(Number).reverse()
    return answer;
}