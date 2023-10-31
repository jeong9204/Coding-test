function solution(numbers) {
    //if(numbers.join('')[0] == "0") return '0'
    numbers.sort((a,b) => ''+a+b>''+b+a ? -1 : 1);
    //return numbers.reduce((acc, cur) => acc+cur, '')
    return numbers.join('')[0] == '0' ? '0' : numbers.join('')
}