function solution(arr) {
    var answer = [];
    let arrLength = arr.length;
    let arrLength2 = arr[0].length;
    if(arrLength === arrLength2) {
        return arr
    } else if(arrLength > arrLength2) {
        for(let i=0; i<arrLength; i++) {
            arr[i].concat(...Array(arrLength-arrLength2).fill(0))
            let newArr = [...arr[i], ...Array(arrLength-arrLength2).fill(0)]
            answer.push(newArr)
            // arr[i].push(0)
            // answer.push(arr[i])
            // console.log(answer)
            // console.log(Array(arrLength-arrLength2).fill(0))
        }
        return answer
    } else if(arrLength < arrLength2) {
        answer = [...arr]
        for(let i=0; i<arrLength2-arrLength; i++) {
            answer.push(Array(arrLength2).fill(0))
        }
        return answer
    }
}