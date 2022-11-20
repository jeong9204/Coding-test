function solution(array, n) {
    var answer = array.reduce((a,b) => {
        if(b === n) {
            return a += 1
        }
        return a
    },0);
    
    return answer;
}