function solution(numbers, n) {
    var answer = numbers.reduce((a,b) => {
        if(a > n) {
            return a
        } else {
          return a = a+b
        }
    })
    return answer;
}