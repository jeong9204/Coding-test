function solution(n, stages) {
    const fail_rate = [];
    let fail = 0;
    let p = 0;
    let f = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j of stages) {
            if (j >= i) {
                p += 1;
            }
            if (j === i) {
                f += 1;
            }
        }
        if (p === 0) {
            fail_rate.push(0);
        } else {
            fail = f / p;
            fail_rate.push(fail);
        }
        f = 0;
        p = 0;
    }
    
    const number = Array.from({length: n}, (_, i) => i + 1);
    const a = [];
    
    for (let x of fail_rate.entries()) {
        a.push(x);
    }
    const b = a.sort((x, y) => y[1] - x[1]);
    const c = [];
    
    for (let i = 0; i < b.length; i++) {
        c.push(b[i][0] + 1);
    }
    return c;
}


// function solution(N, stages) {
    
//     // 실패율은 스테이지에왔는데 못깬 플레이어 수 / 스테이지에 도착한 플레이어 수
//     let player = stages.length;
//     let answer = [];
    
//     for(let i=1; i<=N; i++) {
//         let result = stages.filter(num => num === i)
//         let fail = result.length / player
//         if(stages.includes(i)) {
//            answer.push(fail)
//             stages.splice(i,i)
//         }
//     }
    
//     return answer
//     //return [1/8,3/7,2/4,1/2,0/1].sort((a,b) => b-a);
// }