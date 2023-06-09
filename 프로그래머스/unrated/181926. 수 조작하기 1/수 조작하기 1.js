function solution(n, control) {
    let arr = [...control]
    let answer = n;
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === 'w') {
           answer += 1
        } else if(arr[i] === 's') {
           answer -= 1
        } else if(arr[i] === 'd') {
           answer += 10
        } else if(arr[i] === 'a') {
           answer -= 10
        }
    }
    return answer;
}