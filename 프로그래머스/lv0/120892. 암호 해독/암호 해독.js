function solution(cipher, code) {
    var answer = [];
    let arr = [...cipher]
    for(let i=1; i<=cipher.length; i++) {
        answer.push(arr[(i*code)-1])
    }
    return answer.join('');
}