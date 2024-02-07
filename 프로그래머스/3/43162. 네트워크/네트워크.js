function solution(n, computers) {
    const visited = new Array(n).fill(0)
    let count = 0;

    for (let i=0; i<visited.length; i++) {
        if (visited[i] === 1) continue;

        count += 1;
        dfs(computers, visited, i);
    }

    return count;
}

function dfs(map, visited, node) {
    visited[node] = 1;

    for (let i=0; i<map[node].length; i++) {
        if ( map[node][i] && visited[i] === 0) {
            dfs(map, visited, i);
        }
    }
}