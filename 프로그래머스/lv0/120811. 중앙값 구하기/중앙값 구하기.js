function solution(array) {
    let answer = array.sort((a,b) => a-b);
    let length = parseInt(array.length/2)
    return answer[length];
}