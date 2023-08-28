function solution(arr, k) {
    var answer = [];
    let uniqueArr = [...new Set(arr)]
    if(uniqueArr.length < k) {
        answer = answer.concat(uniqueArr)
    } else {
        for(let i=0; i<k; i++) {
            answer.push(uniqueArr[i])
        }
    }
    while(answer.length < k) {
        answer.push(-1)
    }
    return answer;
}