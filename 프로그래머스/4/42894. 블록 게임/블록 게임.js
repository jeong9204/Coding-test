function solution(board) {
    class Block {
        constructor(num) {
            this.node = [];
            this.num = num;
        }
    }

    const n = board.length;
    const blocks = [];
    const blockNum = new Set();
    let index = -1;
    for (let y = n - 1; y >= 0; y--) {
        let now = 0;
        const blockDone = new Set([...blockNum]);
        for (let x = 0; x < n; x++) {
            if (board[y][x] !== now && !blockNum.has(board[y][x])) {
                now = board[y][x];
                if (now === 0) {
                    continue;
                }
                blockNum.add(now);
                blocks.push(new Block(now));
                index++;
                blocks[index].node.push([y, x]);
            } else {
                now = board[y][x];
                if (now === 0 || blockDone.has(board[y][x])) {
                    continue;
                }
                blocks[index].node.push([y, x]);
            }
        }
    }
    let isChanged = true;
    let answer = 0;
    while (isChanged) {
        isChanged = false;
        let num, y, x;
        const delBlocks = [];
        for (const block of blocks) {
            if (block.node.length < 2) {
                continue;
            }
            let isAble = true;
            num = block.num;
            for (const pos of block.node) {
                if (!isAble) {
                    break;
                }
                y = pos[0];
                x = pos[1];
                for (let i = y - 1; i >= 0; i--) {
                    if (board[i][x] === num) {
                        break;
                    }
                    if (board[i][x] !== 0 && board[i][x] !== num) {
                        isAble = false;
                        break;
                    }
                }
            }
            if (isAble) {
                for (let i = 0; i < board.length; i++) {
                    for (let j = 0; j < board.length; j++) {
                        if (board[i][j] === num) {
                            board[i][j] = 0;
                        }
                    }
                }
                answer++;
                isChanged = true;
                delBlocks.push(block);
            }
        }
        for (const block of delBlocks) {
            blocks.splice(blocks.indexOf(block), 1);
        }
    }
    return answer;
}
