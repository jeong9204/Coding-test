function solution(triangle) {
    for(let i = 1 ; i < triangle.length; i += 1) {
        for (let j = 0; j <triangle[i].length; j += 1){
            triangle[i][j] += Math.max(triangle[i - 1][j - 1] || 0, triangle[i - 1][j] || 0);
        };
    };
    return Math.max(...triangle[triangle.length - 1]);
}