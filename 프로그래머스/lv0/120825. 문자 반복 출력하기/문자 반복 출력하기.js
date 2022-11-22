function solution(my_string, n) {
    var answer = [];
    let arr = [...my_string]
    for(let i=0; i<arr.length; i++) {
        for(let j=0; j<n; j++) {
            answer.push(arr[i]) 
        }
    }
    return answer.join('');
}