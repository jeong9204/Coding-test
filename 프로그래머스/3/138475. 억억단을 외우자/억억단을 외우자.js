function solution(e, starts) {
    let countArr = new Array(5000001).fill(0)
    for (let i = 1; i <= e; i++){
        for (let j = 1; j <= e / i; j++){
            countArr[i * j]++;
        }
    }

    var answer = [];
    let startsArr = []
    for(let i = 0; i < starts.length; i++){
        startsArr.push([starts[i],i])
    }
    let s = startsArr.sort((a,b) => a[0] - b[0])
    let maxNum = [0,0]

    let r = []
    for(let i = e; i > 0; i--){
        if(s.length  === 0) break;
        let count = countArr[i]
        if(maxNum[0] <= count) maxNum = [count,i];
        if(s[s.length-1][0] === i){
            r.push([maxNum[1],s[s.length-1][1]])
            s.pop()
        }
    }

    let newR = r.sort((a,b)=> a[1] - b[1])

    for(let i of newR){
        answer.push(i[0])
    }

    return answer;
}