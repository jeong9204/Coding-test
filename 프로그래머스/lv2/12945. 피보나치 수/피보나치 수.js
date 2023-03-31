function solution(n) {
    const fibos = [0n, 1n]
    for (let i = 2; i <= n; i++) {
        fibos[i] = BigInt(fibos[i - 2]) + BigInt(fibos[i - 1])
    }
    return fibos[n] % 1234567n
}