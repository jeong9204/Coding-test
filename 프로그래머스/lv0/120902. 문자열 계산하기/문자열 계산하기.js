function solution(my_string) {
    var arr = my_string.split(' ');
    let answer = parseInt(arr[0])
    for(let i=1; i<arr.length; i++) {
        if(i%2!=0){
            if(arr[i] === "+"){
                answer += parseInt(arr[i+1]);
            } else {
                answer -= parseInt(arr[i+1]);
            }    
        }
    }
    return answer;
}