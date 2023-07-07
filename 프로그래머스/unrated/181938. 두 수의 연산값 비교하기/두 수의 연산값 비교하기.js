function solution(a, b) {
    let num1 = +(String(a) + String(b))
    let num2 = 2*a*b
    return num1>num2 ? num1 : num2
}