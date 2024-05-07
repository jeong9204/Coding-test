function solution(n, start, end, roads, traps) {
    let idx = new Map();
    traps.forEach((trap, i) => {
        idx.set(trap, i);
    });

    let costs = Array.from({ length: n + 1 }, () => ({}));
    let branch = Array.from({ length: n + 1 }, () => []);

    roads.forEach(([s, e, c]) => {
        branch[s].push([e, c]);
        branch[e].push([s, -c]);
    });

    let state = '0'.repeat(traps.length);
    let qu = [[start, state, 0]];
    costs[start][state] = 0;
    let mincost = 10 ** 9;

    while (qu.length > 0) {
        let [loc, state, cost] = qu.shift();
        let s = idx.has(loc) ? parseInt(state[idx.get(loc)]) : 0;

        branch[loc].forEach(([d, c]) => {
            let cnt = idx.has(d) ? parseInt(state[idx.get(d)]) : 0;
            let nstate = idx.has(d) ? state.slice(0, idx.get(d)) + (1 - cnt) + state.slice(idx.get(d) + 1) : state;

            if (c * (-1) ** (s + cnt) > 0) {
                if (!(nstate in costs[d]) || cost + Math.abs(c) < costs[d][nstate]) {
                    if (cost + Math.abs(c) < mincost) {
                        costs[d][nstate] = cost + Math.abs(c);
                        if (d === end) {
                            mincost = cost + Math.abs(c);
                        } else {
                            qu.push([d, nstate, cost + Math.abs(c)]);
                        }
                    }
                }
            }
        });
    }

    return mincost;
}
