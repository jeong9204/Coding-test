function solution(emergency) {
    let obj = {}
    let count = emergency.length

    for (let i = 0; i < emergency.length; i++) {
        obj[emergency[i]] = count--
    }
    console.log(obj)

    return Object.values(obj)
}