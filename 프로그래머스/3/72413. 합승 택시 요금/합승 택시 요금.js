function solution(n, s, a, b, fares) {
    const INF = Infinity;
    const graph = Array(n).fill().map(() => Array(n).fill(INF));
    fares.forEach(([x, y, cost]) => {
        graph[x - 1][y - 1] = cost;
        graph[y - 1][x - 1] = cost;
    })
    for(let i = 0; i < n; i++) graph[i][i] = 0;

    const floydWarshall = (dist) => {
        const len = dist.length;
        for(let i = 0; i < len; i++) {
            for(let j = 0; j < len; j++) {
                for(let k = 0; k < len; k++) {
                    dist[j][k] = Math.min(dist[j][k], dist[j][i] + dist[i][k]);
                }
            }
        }
    }

    floydWarshall(graph);

    let min = INF;
    for(let waypoint = 0; waypoint < n; waypoint++) {
            min = Math.min(min, graph[s - 1][waypoint] + graph[waypoint][a - 1] + graph[waypoint][b - 1]);
    }

    return min;
}