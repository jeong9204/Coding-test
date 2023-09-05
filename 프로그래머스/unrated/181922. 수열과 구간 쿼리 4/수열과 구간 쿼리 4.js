function solution(arr, queries) {
    let answer = arr.slice();

    queries.forEach(query => {
        for (let i = 0; i < answer.length; i++) {
            if (i >= query[0] && i <= query[1]) {
                if (i % query[2] === 0) {
                    answer[i]++;
                }
            }
        }
    });

    return answer;
    
//     for (let i = 0; i <queries.length; i++) {
//         let s=queries[i][0];
//         let e=queries[i][1];
//         let k=queries[i][2];
        
//         let newArr = Array(e-s+1).fill().map((v,i)=>i+1);
//         for(let j=s; j<=e; j++){
//             if (arr[i]%k==0){
//                 arr[newArr[i]] += 1;
//             }
//         }
//     }
    return answer;
}

// class Solution {
//     fun solution(arr: IntArray, queries: Array<IntArray>): IntArray {
//         var answer = arr

//         queries.forEach{
//             for(i in 0 .. answer.size-1) {
//                 if(i in (it[0] .. it[1])){
//                     if(i % it[2] == 0 ) answer[i]++
//                 }
//             }
//             //println(Arrays.toString(answer))
//         }

//         return answer
//     }
// }