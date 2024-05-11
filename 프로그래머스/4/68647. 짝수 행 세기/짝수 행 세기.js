const MOD = 1e7 + 19;

function solution (a) {
  const row = a.length;
  const col = a[0].length;
  
  const combis = new Array(row+1).fill().map(_ => new Array(row+1).fill(0));
  combis[0][0] = 1;
  
  for (let i = 1; i <= row; i++) {
    for(let j = 0; j <= i; j++) {
      if (j === 0) combis[i][j] = 1;
      else if (i === j) combis[i][j] = 1;
      else combis[i][j] = (combis[i-1][j-1] + combis[i-1][j]) % MOD;
    }
  }
  
  const numOfOne = new Array(col).fill(0);
  
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (a[i][j]) numOfOne[j]++;
    }
  }
  
  const DP = new Array(col+1).fill().map(_ => new Array(row+1).fill(0));
  DP[1][row-numOfOne[0]] = combis[row][row-numOfOne[0]];
  
  for (let curCol = 1; curCol <= col; curCol++) {
    for (let curRow = 0; curRow <= row; curRow++) {
      if (!DP[curCol][curRow]) continue;
      
      for (let one = 0; one <= numOfOne[curCol]; one++) {
        const next = (curRow - one) + (numOfOne[curCol] - one);
        
        if (next > row || curRow < one) continue;
        
        const cases = (combis[curRow][one] * combis[row-curRow][numOfOne[curCol]-one]) % MOD;
        
        DP[curCol+1][next] += (DP[curCol][curRow] * cases) % MOD;
      }
    }
  }
  
  return DP[col][row];
}