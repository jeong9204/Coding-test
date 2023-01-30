function solution(a, b, n) {
    let totalGetCola = 0;
    let nowGetCola = 0;
    let inputCola = n;

    while (inputCola >= a) {
        nowGetCola = parseInt(inputCola / a) * b
        totalGetCola += nowGetCola
        inputCola = nowGetCola + inputCola % a
    }
    return totalGetCola;
}