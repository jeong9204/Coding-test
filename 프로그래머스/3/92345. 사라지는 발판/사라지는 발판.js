function solution_(board, aloc, bloc) {

    let nexts = [];
    let moves = [[0,1],[0,-1],[1,0],[-1,0]];

    for (let move of moves) {
        nexts.push([aloc[0]+move[0],aloc[1]+move[1]])
    }
    nexts = nexts.filter(e => e[0] >= 0 && e[0] < board.length && e[1] >= 0 
                         && e[1] < board[0].length && board[e[0]][e[1]] == 1);

    if(board[aloc[0]][aloc[1]] == 0 || nexts.length == 0) return {Fwin:false,cnt:0};

    board[aloc[0]][aloc[1]] = 0;
    let results = [];

    for (let next of nexts) {
        results.push(solution_(board,bloc,next));
    }
    board[aloc[0]][aloc[1]] = 1;

    let flag = false;
    let max = 0;
    let min = 100000;
    for (let result of results) {
        flag = flag || !result.Fwin;
        if (!result.Fwin) min = Math.min(min, result.cnt)
        else max = Math.max(max, result.cnt);
    }

    if (flag){
        //console.log(board,aloc,bloc,nexts,{Fwin:true, cnt:min+1}) 
        return {Fwin:true, cnt:min+1}

    }
    else {
        //console.log(board,aloc,bloc,nexts,{Fwin:false, cnt:max+1})
        return {Fwin:false, cnt:max+1}
    }
}

function solution(board, aloc, bloc) {
    return solution_(board, aloc, bloc).cnt;
}