function solution(arr1, arr2) {
    let answer = [];
    for(let i=0; i<arr1.length; i++) {
        const rows = []
        for(let j=0; j<arr2[0].length; j++) {
            let sum = 0;
            for(let k=0; k<arr1[i].length; k++) {
                sum += arr1[i][k] * arr2[k][j]
            }
            rows.push(sum)
        }
        answer.push(rows)
    }
    return answer;
}

// function solution(arr1, arr2) {
//     const answer = []

//     for(let arr1RowIdx=0;arr1RowIdx<arr1.length;arr1RowIdx++){
//         const rows = []
//         for(let arr2ColIdx=0;arr2ColIdx<arr2[0].length;arr2ColIdx++){
//             let sum = 0
//             for(let arr1ColIdx=0;arr1ColIdx<arr1[arr1RowIdx].length;arr1ColIdx++){
//                 sum += arr1[arr1RowIdx][arr1ColIdx] * arr2[arr1ColIdx][arr2ColIdx]
//             }
//             rows.push(sum)
//         }
//         answer.push(rows)
//     }

//     return answer
// }