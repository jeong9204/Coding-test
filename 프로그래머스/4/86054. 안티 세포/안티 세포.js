function solution(a, s) {
    const MOD = 1000000007;
    const answer = [];

    let end = 0;
    for (let t = 0; t < s.length; t++) {
        const n = s[t];
        const start = end;
        end = start + n;
        const sum = new Array(n + 1).fill(0);
        sum[0] = 1;

        const levels = new Array(n + 1).fill().map(() => new Map());
        levels[0].set(-1, -1);

        for (let i = 1; i <= n; i++) {
            sum[i] = connect(a[start + i - 1], i, i - 1, levels, sum);
        }

        answer.push(sum[n] % MOD);
    }

    return answer;
}

function connect(num, here, par, levels, sum) {
    const level = levels[here];
    if (!level.has(num)) {
        level.set(num, par);
    }

    let ret = sum[par];

    if (levels[par].has(num)) {
        ret += connect(num * 2, here, levels[par].get(num), levels, sum);
        ret %= 1000000007; // MOD
    }

    return ret;
}
