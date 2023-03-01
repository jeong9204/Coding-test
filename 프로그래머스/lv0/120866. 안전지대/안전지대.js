function solution(board) {
  for (let column = 0; column < board.length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (board[column][row] === 1) {
        board[column][row] = 2;
      }
    }
  }
  const extendedMatrix = Array.from({ length: board.length + 2 }, () =>
    Array(board.length + 2).fill("m")
  );

  for (let column = 0; column < board.length + 2; column++) {
    for (let row = 0; row < board.length + 2; row++) {
      if (1 <= column && column <= board.length && 1 <= row && row <= board.length) {
        extendedMatrix[column][row] = board[column - 1][row - 1];
      } else {
        extendedMatrix[column][row] = 1;
      }
    }
  }

  const copyed = JSON.parse(JSON.stringify(extendedMatrix));

  for (let column = 0; column < board.length + 2; column++) {
    for (let row = 0; row < board.length + 2; row++) {
      if (1 <= column && column <= board.length && 1 <= row && row <= board.length) {
        if (copyed[column][row] === 2) {
          extendedMatrix[column - 1][row - 1] = 1;
          extendedMatrix[column][row - 1] = 1;
          extendedMatrix[column + 1][row - 1] = 1;
          extendedMatrix[column - 1][row] = 1;
          extendedMatrix[column + 1][row] = 1;
          extendedMatrix[column - 1][row + 1] = 1;
          extendedMatrix[column][row + 1] = 1;
          extendedMatrix[column + 1][row + 1] = 1;
        }
      } else {
        extendedMatrix[column][row] = 1;
      }
    }
  }

  return zeroCounter(extendedMatrix);
}

function zeroCounter(board) {
  let count = 0;
  for (let column = 0; column < board.length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (board[column][row] === 0) {
        count++;
      }
    }
  }

  return count;
}
