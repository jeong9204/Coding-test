function solution(i, j, k) {
    var answer = [];
    for(let n=i; n<=j; n++) {
        answer.push((''+n).replaceAll(k,'*'))
    }
    let num = answer.join('').replaceAll(/\d/ig,'')
    return num.length;
}