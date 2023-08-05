function solution(x1, x2, x3, x4) {
    let a
    let b
    x1 && x2 ? a = x1 && x2 : a = x1 || x2
    x3 && x4 ? b = x3 && x4 : b = x3 || x4
    return (a && b)
}