function solution(n, t, m, p) {
    let saveString = '';
    let number = 0;
    
    while(t*m > saveString.length) {
        saveString = saveString.concat(number.toString(n))
        number++
    }
    saveString = saveString.slice(0, t*m)
    const answer = saveString.split('').filter((num, idx) => {
        return ((idx - p + 1) % m) === 0
    }).join('').toUpperCase();
    return answer;
}

// function solution(n, t, m, p) {
//     let saveString = ''
//     let number = 0
//     // 최소한 t*m보다 긴 saveString 생성
//     while(t*m > saveString.length){
//         saveString = saveString.concat(number.toString(n))
//         number++
//     }

//     // 필요한 t*m 길이만큼 slice
//     saveString  = saveString.slice(0,t*m)

//     // p번째 순서에 대해서만 filter 처리 후 대문자 처리 
//     const answer = saveString.split('').filter((num,idx)=>{
//         return ((idx-p+1) % m )===0
//     }).join('').toUpperCase()

//     return answer;
// }