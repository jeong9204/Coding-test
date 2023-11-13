function solution(expression) {
    function dfs(op, arr, visited) { 
      if (arr.length === 3) {
        prior.push(arr);
      }
      for (let i = 0; i < op.length; i++) {
        if (visited[i]) continue;
        const temp = [...arr, op[i]];
        visited[i] = 1;
        dfs(op, temp, visited);
        visited[i] = 0;
      }
    }

    function calc(a, b, op) { 
      a = parseInt(a);
      b = parseInt(b);
      switch (op) {
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
      }
    }

    expression = expression.match(/\d+|[\-\+\*]/g);

    const prior = [];
    let max = 0;

    dfs(['-', '*', '+'], [], [0, 0, 0]);
    
    for (let i = 0; i < prior.length; i++) {
      let temp = [...expression];

      for (let j = 0; j < prior[i].length; j++) { 
        let idx = 0;

        while (true) {
          idx = temp.indexOf(prior[i][j]); 
          if (idx === -1) break; 
          let sum = calc(temp[idx - 1], temp[idx + 1], prior[i][j]); 

          temp.splice(idx - 1, 3, sum);
        }
      }

      max = Math.max(max, Math.abs(temp));
    }
    return max;
  }