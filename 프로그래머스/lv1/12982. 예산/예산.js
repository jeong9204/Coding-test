function solution(d, budget) {
    let sort = d.sort((a,b) => a-b)
    let answer = 0;
    if(d.reduce((a,b) => a+b) === budget) return d.length
    if(d.reduce((a,b) => a+b) < budget) return d.length
    for(let i=0; i<d.length; i++) {
        answer += sort[i]
        if(answer > budget) {
            return i
        }
        
    }
}