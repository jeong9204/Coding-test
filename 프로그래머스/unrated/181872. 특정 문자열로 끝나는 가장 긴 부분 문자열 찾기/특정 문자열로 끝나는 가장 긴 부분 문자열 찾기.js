function solution(myString, pat) {
    var answer = [];
    for(let i=0; i<myString.length; i++) {
        let str = myString.slice(0, i+1)
        if(str.endsWith(pat)) {
            answer.push(str)
        }
    }
    return answer.pop();
}