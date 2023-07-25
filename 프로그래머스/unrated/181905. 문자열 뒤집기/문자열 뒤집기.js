function solution(my_string, s, e) {
    var answer = [...my_string.slice(s,e+1)].reverse().join('')
    return my_string.substring(0,s) + answer + my_string.substring(e+1)
    // return answer
}