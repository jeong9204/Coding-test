function solution(emergency) {
    let obj = {}
    let count = emergency.length
    console.log('emergency',emergency)
    for (let i = 0; i < emergency.length; i++) {
        obj[emergency[i]] = count--
        console.log('obj',obj)
    }
    // console.log(obj)

    return Object.values(obj)
}