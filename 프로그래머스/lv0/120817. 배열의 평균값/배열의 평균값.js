function solution(numbers) {
    var answer = numbers.reduce((a,b) => a+b);
    return answer / numbers.length;
}