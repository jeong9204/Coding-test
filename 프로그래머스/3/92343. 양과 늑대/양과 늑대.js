function solution(info, edges) {
    var answer = 0;

    let graph = new Array(info.length).fill(0).map(e => new Array(info.length).fill(false));

    for(let i of edges) {
        graph[i[0]][i[1]] = true;
    }
    let cache = {};
    let cache2 = {};
    let cache3 = {};

    let solution = new Array(info.length).fill(0);
    solution[0] = 1;
    cache[JSON.stringify(solution)] = 1;
    cache2[JSON.stringify(solution)] = true;
    cache3[JSON.stringify(solution)] = 1;

    let queue = [solution];
    while (queue.length > 0) {
        let cur = queue.shift();
        if (cache[JSON.stringify(cur)] == 0) {
            continue;
        }
        else if (cache[JSON.stringify(cur)] > 0) {
            for (let i=0; i<info.length; i++) {
                for (let j=0; j<info.length; j++) {
                    if(cur[i] && graph[i][j] && !cur[j]) {
                        //console.log(j)
                        let cp = cur.slice();
                        cp[j] = 1;
                        if(cache2[JSON.stringify(cp)] != undefined) continue;
                        cache2[JSON.stringify(cp)] = true;
                        cache[JSON.stringify(cp)] = cache[JSON.stringify(cur)] + (info[j]==0?1:-1)
                        cache3[JSON.stringify(cp)] = cache3[JSON.stringify(cur)] + (info[j]==0?1:0);
                        queue.push(cp);
                    }
                }
            }
        }
    }
    //console.log(cache3)
    for (i in cache3) {
        answer = Math.max(answer,cache3[i]);
    }
    return answer;
}