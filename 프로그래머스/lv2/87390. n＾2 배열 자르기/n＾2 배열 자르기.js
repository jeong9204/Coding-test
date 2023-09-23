function solution(n, left, right) {
    var answer = [];
    for(let i=left;i<=right;i++){
        const divide = Math.floor(i/n)
        const rest = i%n
        if(divide >= rest){
            answer.push(divide+1)
        }
        else{
            answer.push(rest+1)
        }
    }
    return answer;
}