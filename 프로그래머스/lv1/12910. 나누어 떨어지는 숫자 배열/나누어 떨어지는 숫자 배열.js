function solution(arr, divisor) {
    var answer = [];
    // for(let i=0; i<=arr.length; i++){
    //     if(arr[i] % divisor === 0) {
    //         answer.push(arr[i])
    //     }
    // }
    
    arr.reduce((a,b) => {
        if(b % divisor === 0 ) {
            answer.push(b)
        } 
    },[arr[0]])
    
     // answer = arr.filter(a => a % divisor === 0)
    
    
    return answer.length > 0 ? answer.sort((a,b) => a-b) : [-1];
}