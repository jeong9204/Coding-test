function solution(n, roads, sources, destination) { 
    const graph = Array.from({length : n + 1}, () => []);

    for (const [v1, v2] of roads){
        graph[v1].push(v2);
        graph[v2].push(v1);
    };

    const map = Array.from({length : n + 1}, () => -1);
    const queue = [destination];
    map[destination] = 0;

    while(queue.length){
        const start = queue.shift();

        for(const next of graph[start]){
            if(map[next] === -1){
                map[next] = map[start] + 1;
                queue.push(next);
            };
        };
    };

    const result = [];
    for (const s of sources){
        result.push(map[s]);
    };

    return result;
}
