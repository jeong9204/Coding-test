function solution(tickets) {
    const graph = tickets.reduce((acc, [from, to], i) => {
        if (!acc[from]) acc[from] = [to];
        else acc[from] = [...acc[from], to].sort().map((f, i) => `${f}${i}`);
        return acc;
    }, {});

    let used = [];
    let path = ['ICN'];
    const dfs = (from) => {
        if (graph[from]) {
            const pCache = [...path];
            const uCache = [...used];

            for(let i = 0; i < graph[from].length; i++) {
                const to = graph[from][i];

                if (!used.find(([vf, vt]) => vf === from && vt === to)) {
                    const realTo = to.replace(/[0-9]/g, '');

                    path.push(realTo);
                    used.push([from, to]);

                    if (!dfs(realTo)) {
                        path = pCache;
                        used = uCache;
                    }
                }
            }
        }

        return tickets.length === used.length;
    }

    dfs('ICN');

    return path;
}
