function solution(arr, queries) {
    var answer = [];
    for(let i=0; i<queries.length; i++) {
        let s = queries[i][0];
        let e = queries[i][1];
        let k = queries[i][2];
        
        let num = []
        for(let j=s; j<=e; j++) {
            if(arr[j]>k) {
                num.push(arr[j])
            }
        }
        answer.push(num.length === 0 ? -1 : Math.min(...num))
    }
    return answer;
}