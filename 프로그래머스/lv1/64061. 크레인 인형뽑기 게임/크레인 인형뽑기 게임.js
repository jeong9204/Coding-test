function solution(board, moves) {
    var answer = 0;
    const popped = moves.reduce((stack, m) => {
        m = m - 1;
        for (let n = 0; n < board.length; n++) {
            if (board[n][m] != 0) {
                stack.push(board[n][m]);
                board[n][m] = 0
                return stack;
            }
        }
        return stack;
    }, [])
    answer = crush(popped, 0)
    return answer;
}

function crush(arr, crushed) {
    for (let p = 0; p < arr.length - 1; p++) {
        if (arr[p] == arr[p + 1]) {
            crushed = crushed + 2;
            arr.splice(p, 2)
            return crush(arr, crushed)
        }
    }
    return crushed
}