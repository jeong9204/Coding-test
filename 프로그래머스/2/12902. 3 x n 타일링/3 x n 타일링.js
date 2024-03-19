function solution(n) {
    const dp = new Array(6000).fill(0);

    dp[0] = 1;
    dp[2] = 3;

    if (n % 2 === 1) // n이 홀수인 경우
        return 0;

    for (let i = 4; i <= n; i += 2) {
        dp[i] = ((4 * dp[i - 2] - dp[i - 4]) % 1000000007);
        if (dp[i] < 0)
            dp[i] += 1000000007;
    }

    return dp[n];
}
