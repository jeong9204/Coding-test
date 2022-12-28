function solution(order) {
    var answer = 0;
    let arr = (''+order).split('');
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === "3") {
            answer +=1
        } else if(arr[i] === "6") {
            answer +=1
        } else if(arr[i] === "9") {
            answer +=1
        }
    }
    return answer;
}