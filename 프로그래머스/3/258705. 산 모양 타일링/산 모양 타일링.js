function solution(n, tops) {
    const MOD = 10007;
    let DP = new Array(n + 1).fill(null).map(() => new Array(2).fill(0));
    DP[0][1] = 1;

    for (let i = 0; i < n; i++) {
        let top = tops[i];
        let k = i + 1;
        DP[k][0] = (DP[i][0] + DP[i][1]) % MOD;
        
        if (top === 0) {
            DP[k][1] = (DP[i][0] + DP[i][1] * 2) % MOD;
        } else {
            DP[k][1] = (DP[i][0] * 2 + DP[i][1] * 3) % MOD;
        }
    }

    return (DP[n][0] + DP[n][1]) % MOD;
}
