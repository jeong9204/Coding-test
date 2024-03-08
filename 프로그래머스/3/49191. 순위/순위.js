function solution(n, results) {
    var g = Array(n+1).fill(null).map(() => Array(n+1).fill(0));
    for (var [u,v] of results) {
        g[u][v] = 1;
        g[v][u] = -1;
    }

    for (var k=1;k<=n;k++)
        for (var u=1;u<=n;u++)
            for (var v=1;v<=n;v++) {
                if (g[u][v] != 0) continue;
                if (g[u][k] == 1 && g[k][v] == 1)
                    g[u][v] = 1;
                else if (g[u][k] == -1 && g[k][v] == -1)
                    g[u][v] = -1;
            }

    return g.filter(u => u.filter(v => v == 0).length == 2).length;
}