function solution(strArr) {
    let answer = [];
    for(let i=0; i<strArr.length; i++) {
        answer.push(strArr[i].length)
    }
    
    let result = {}
    answer.forEach((x) => {
        result[x] = (result[x] || 0) +1;
    })
    return Math.max(...Object.values(result))
}