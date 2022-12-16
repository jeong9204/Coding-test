function solution(my_string) {
    let arr = [...my_string];
    let answer = [...new Set(arr)]
    return answer.join('');
}