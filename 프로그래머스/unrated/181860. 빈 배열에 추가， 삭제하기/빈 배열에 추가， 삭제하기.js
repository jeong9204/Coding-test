function solution(arr, flag) {
    var answer = [];
    for(let i=0; i<arr.length; i++) {
        if(flag[i]) {
            for(let j=1; j<=arr[i]*2; j++) {
                answer.push(arr[i])
            }
        } else if(!flag[i]) {
            for(let j=1; j<=arr[i]; j++) {
                answer.pop()
            }
        }
    }
    return answer;
}