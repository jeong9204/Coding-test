function solution(numbers, direction) {
    var answer = '';
    let arr = []
    if(direction === 'right') {
       answer = numbers.pop()
        numbers.unshift(answer)
    } else if(direction === 'left') {
        answer = numbers.shift()
        numbers.push(answer)
    }
    return numbers
}