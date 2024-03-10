function effect(board, skill) {
    let damage = skill[5];
    if (skill[0] == 1) damage = damage*(-1);
    board[skill[1]][skill[2]] += damage;
    if (skill[4]+1 < board[0].length) board[skill[1]][skill[4]+1] -= damage;
    if (skill[3]+1 < board.length) board[skill[3]+1][skill[2]] -= damage;
    if (skill[4]+1 < board[0].length && skill[3]+1 < board.length) board[skill[3]+1][skill[4]+1] += damage;
}

function solution(board, skill) {
    var answer = 0;
    let aBoard = new Array(board.length).fill(0).map(e => new Array(board[0].length).fill(0))
    for(let i in skill) {
        effect(aBoard,skill[i])
        //console.log(aBoard)
    }

    for(let i=0; i<aBoard.length; i++) {
        for (let j=1; j<aBoard.length; j++) {
            aBoard[i][j] += aBoard[i][j-1]; 
        }
    }

    for(let i=0; i<aBoard.length; i++) {
        for (let j=1; j<aBoard.length; j++) {
            aBoard[j][i] += aBoard[j-1][i]; 
        }
    }

    for(let i=0; i<aBoard.length; i++) {
        for (let j=0; j<aBoard.length; j++) {
            board[i][j] += aBoard[i][j]; 
        }
    }

    for(let i in board) {
        for (let j in board[i]) {
            if(board[i][j] > 0) answer += 1; 
        }
    }
    return answer;
}