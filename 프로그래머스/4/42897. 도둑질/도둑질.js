function solution(money) {
    let MAX = -Infinity;
    let dp = new Array(money.length).fill(0);   // 첫번째 집부터 털어서 최대
    let dp2 = new Array(money.length).fill(0);  // 두번째 집부터 털어서 최대

    dp[0] = money[0];
    dp[1] = Math.max(money[0], money[1]);
    dp2[0] = 0;
    dp2[1] = money[1];

    for(let i=2; i<money.length; i++){
        if(i<money.length-1) dp[i] = Math.max(dp[i - 1], dp[i - 2] + money[i]);
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i]); 
        MAX = Math.max(dp[i],MAX,dp2[i])
    }

    return MAX;

}