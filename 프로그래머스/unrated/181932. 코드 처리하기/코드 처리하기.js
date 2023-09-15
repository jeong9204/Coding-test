function solution(code) {
    var answer = '';
    let arr = [...code]
    let mode = 0;
    arr.forEach((str, i) => {
        if(str === '1') {
            if(mode === 0) {
                mode = 1
            } else if(mode === 1) {
                mode = 0
            }
            return;
        }
        if(mode === 0) {
            if(i % 2 === 0) {
                answer+= str
            }
        } else if(mode === 1) {
            if(i % 2 !== 0) {
                answer+= str
            }
        }
    })
    return answer.length === 0 ? 'EMPTY' : answer;
}