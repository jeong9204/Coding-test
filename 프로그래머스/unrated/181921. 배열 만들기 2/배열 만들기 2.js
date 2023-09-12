function solution(l, r) {
    var answer = [];
    for(let i=l; i<=r; i++) {
        if(i.toString().replace(/[05]/g,'').length === 0) {
            answer.push(i)
        }
        // if (i % 5 === 0) {
        //     if ([...i.toString()].every((element) => element === '5' || element == '0')) {
        //         answer.push(i);
        //     }
        // }
    }
    return answer.length===0 ? [-1] : answer;
}