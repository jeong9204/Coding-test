function solution(n, lost, reserve) {
    let answer = 0;
    let std = new Array(n+2).fill(1);
    let ls = Array.from({length: n+2}, (_, i) => lost.includes(i) ? 1 : 0);
    let rs = Array.from({length: n+2}, (_, i) => reserve.includes(i) ? 1 : 0);
    let p = std.map((value, i) => value - ls[i] + rs[i]);

    for(let i=1; i<=n; i++) {
        if(p[i] > 1 && p[i-1] === 0) {
            p[i] -= 1;
            p[i-1] += 1;
            }
        if(p[i] > 1 && p[i+1] === 0) {
            p[i] -= 1;
            p[i+1] += 1;
        }
    }

    answer = n - p.filter(value => value === 0).length;
    return answer;
}