function solution(matrix_sizes) {
    let matrix = matrix_sizes;
    let memo = new Array(matrix.length + 1).fill().map(() => new Array(matrix.length + 1).fill(0));
    return matmul(0, matrix.length);

    function matmulDP(s, e) {
        if (memo[s][e] === 0)
            memo[s][e] = matmul(s, e);
        return memo[s][e];
    }

    function matmul(s, e) {
        if (e - s === 1)
            return 0;

        let ans = 987654321;
        for (let m = s + 1; m < e; m++) {
            let left = matmulDP(s, m);
            let right = matmulDP(m, e);
            let current = matrix[s][0] * matrix[m][0] * matrix[e - 1][1];
            ans = Math.min(ans, left + right + current);
        }
        return ans;
    }
}
