function solution(t, p) {
    let pe = p.length - 1;
    let d = [];
    let count = 0;
    for(let i = 0; i < t.length - pe; i++){
        if(parseInt(t.substring(i,pe + i + 1)) <= parseInt(p)){
            count++;
        }
    }
    return count;
}