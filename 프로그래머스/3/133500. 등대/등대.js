function solution(n, lighthouse) {
    const graph = Array.from({ length: n + 1 }, () => []);

    lighthouse.forEach(edge => {
        const [s, e] = edge;
        graph[s].push(e);
        graph[e].push(s);
    });

    const visited = new Array(n + 1).fill(false);
    const res = new Array(n + 1).fill().map(() => [0, 0]);
    const stk = [];

    stk.push(1);
    while (stk.length > 0) {
        let node = stk.pop();
        if (node > 0) {
            visited[node] = true;
            stk.push(-node);
            graph[node].forEach(child => {
                if (!visited[child]) {
                    stk.push(child);
                }
            });
        } else {
            node = -node;
            graph[node].forEach(child => {
                if (res[child][0] > 0) {
                    res[node][0] += Math.min(res[child][0], res[child][1]);
                    res[node][1] += res[child][0];
                }
            });
            res[node][0]++;
        }
    }

    return Math.min(res[1][0], res[1][1]);
}
