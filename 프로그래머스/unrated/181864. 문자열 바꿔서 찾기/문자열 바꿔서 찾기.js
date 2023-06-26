function solution(myString, pat) {
    var answer = [...myString].reduce((a,b) => {
        if(b === 'A') {
            a+="B"
        } else {
            a+="A"
        }
        return a
    },'');
    return answer.includes(pat) ? 1 : 0;
}