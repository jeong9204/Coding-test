function solution(m, n, puddles) {

    const map = Array.from(Array(n), () => Array(m).fill(1)); 
    const denominator = 1000000007;

    for(const puddle of puddles){
        const [x, y] = puddle;
        if(x === 1)
            for(let i = y-1; i < n; i++)
                map[i][x-1] = 0;
        if(y === 1)
            for(let i = x-1; i < m; i++)
                map[y-1][i] = 0;
    }

    for(const puddle of puddles){
        const [x, y] = puddle;
        map[y-1][x-1] = 0;
    }

    for(let x = 0; x < m; x++){
        for(let y = 0; y < n; y++){
            if(x-1 < 0 || y-1 < 0)
                continue;
            if(map[y][x] === 0)
                continue;
            map[y][x] = map[y][x-1] + map[y-1][x];
            map[y][x] = map[y][x] % denominator;
        }
    }
    return map[n-1][m-1];
}