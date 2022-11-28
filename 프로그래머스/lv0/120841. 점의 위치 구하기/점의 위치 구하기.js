function solution(dot) {
    let x = dot[0] > 0 ? 1 : 0
    let y = dot[1] > 0 ? 1 : 0
    if(x === 1 && y === 1) {
        return 1
    } else if (x === 1 && y === 0) {
        return 4
    } else if(x === 0 && y === 0) {
        return 3
    } else if (x === 0 && y === 1) {
        return 2
    }
}