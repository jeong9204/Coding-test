function solution(n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            let num = i - 1;
            dp[i] += dp[j] * dp[num - j];
        }
    }
    
    return dp[n];
}
