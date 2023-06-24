function solution(my_string, is_prefix) {
    var answer = [];
    for(let i =0; i<my_string.length; i++) {
        console.log('answer', answer.join(''))
        if(answer.join('') === is_prefix) {
            return 1
            break;
        } else {
            answer.push(my_string[i]);
        }
    }
    return 0;
}