function solution(my_string, m, c) {
    if(m === 1 && c === 1) {
        return my_string
    }
    var answer = ''
    for(let i=0; i<my_string.length/m; i++) {
        answer += my_string.substring(i * m, i * m + m).charAt(c - 1);
    }
    return answer;
}