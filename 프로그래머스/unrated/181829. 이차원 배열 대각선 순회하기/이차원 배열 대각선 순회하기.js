function solution(board, k) {
    return board
    .flatMap((row, i) => row.filter((value, j) => i + j <= k))
    .reduce((acc, curr) => acc + curr, 0);
}