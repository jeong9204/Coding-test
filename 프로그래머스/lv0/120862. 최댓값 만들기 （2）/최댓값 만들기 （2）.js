function solution(numbers) {
    var answer = -100000000;
    for(let i=0; i<numbers.length; i++) {
        for(let j=i+1; j<numbers.length; j++) {
            let sum = numbers[i] * numbers[j]
            if(answer < sum) {
                answer = sum
            }
        }
    }
    return answer
}