function solution(strs, t) {
    const MAX_VALUE = Number.MAX_SAFE_INTEGER;
    const dp = new Array(t.length + 1).fill(MAX_VALUE - 1);
    dp[0] = 0;

    for (let i = 1; i <= t.length; i++) {
        for (const str of strs) {
            if (i >= str.length && t.substring(i - str.length, i) === str) {
                dp[i] = Math.min(dp[i], dp[i - str.length] + 1);
            }
        }
    }

    return dp[t.length] === MAX_VALUE - 1 ? -1 : dp[t.length];
}
