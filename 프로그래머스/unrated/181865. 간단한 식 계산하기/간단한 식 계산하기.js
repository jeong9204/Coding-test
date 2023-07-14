// function solution(binomial) {
//     let arr = binomial.split(' ')
//     return parseInt(arr[0])+arr[1]
// }

function solution(binomial) {
    return Function(`return ${binomial}`)()
}