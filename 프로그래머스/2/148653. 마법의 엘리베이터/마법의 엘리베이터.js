function solution(storey) {
    const str = String(storey);
    const n = str.length;
    let result = Infinity;

    dfs(n - 1, 0, 0);

    function dfs(cursor, offset, score) {
        if (cursor === -1) {
            result = Math.min(result, score + offset);
            return;
        }
        const num = Number(str[cursor]) + offset;
        dfs(cursor - 1, 0, score + num);
        dfs(cursor - 1, 1, score + 10 - num);
    }

    return result;
}