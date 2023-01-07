function solution(n) {
    let count = 0
    for(let i = 1 ; i <= n; i ++) {
        isMixNumber(i) ? count++ : null
    }
    return count
}

// 합성수인지 판별하는 함수
function isMixNumber(num) {
    let count = 0
    // 약수의 개수를 셈
    for(let i = 1 ; i <= (num/2)<<0 ; i ++) {
        num%i === 0 ? count++ : null
    }
    return count >= 2 ? true : false
}