function solution(my_str, n) {
    let arr = [...my_str]
    var answer = [];
    let length = my_str.length/n
    for(let i=0; i<length; i++) {
        answer.push(arr.splice(0,n).join(''))
    }
    return answer;
}