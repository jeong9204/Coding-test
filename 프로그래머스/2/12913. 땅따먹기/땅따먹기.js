function solution(land) {
    const dp = Array.from({length: land.length}, () => Array(4).fill(0));
    
    dp[0] = land[0];
    for(let i=0; i<land.length -1; i++) {
        for(let j=0; j<4; j++) {
            for(let k=0; k<4; k++) {
                if(j===k) {
                    continue;
                }
                const temp = dp[i][j] + land[i+1][k];
                if(temp > dp[i+1][k]) {
                    dp[i+1][k] = temp;
                }
            }
        }
    }
    return Math.max(...dp.at(-1))
}

// function solution(land) {

//     // 이차원 배열 생성
//     const dp = Array.from({length : land.length}, () => Array(4).fill(0));

//     dp[0] = land[0];
//     for(let i = 0; i< land.length - 1; i++){
//         for(let j = 0; j < 4; j++)
//             for(let k = 0; k < 4; k++){
//                 if(j===k)
//                     continue;
//                 const temp = dp[i][j] + land[i+1][k];
//                 if(temp > dp[i+1][k])
//                     dp[i+1][k] = temp;
//             }
//     }
//     return Math.max(...dp.at(-1));
// }