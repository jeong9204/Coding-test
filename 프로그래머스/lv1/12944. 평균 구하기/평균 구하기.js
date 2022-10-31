function solution(arr) {
    var answer = 0;
    let add = 0;
    
    for(let i = 0; i<arr.length; i++){
        add += arr[i]
    }
    
    answer = add/arr.length;
    
    return answer;
}