function solution(n, s) {
    if(n>s) return [-1];

    const ans = [];
    for(i=n; i>0;i--) {
            const avg = Math.floor(s/i);
            ans.push(avg);
            s -= avg
    }
    return ans;
}