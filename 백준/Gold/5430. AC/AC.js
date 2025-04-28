const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const T = Number(input[0]);
  let idx = 1;

  const results = [];

  for (let t = 0; t < T; t++) {
    const p = input[idx++];
    const n = Number(input[idx++]);
    let arr = input[idx++]
      .slice(1, -1) // [1,2,3,4] → 1,2,3,4
      .split(',')
      .filter(x => x !== '')
      .map(Number); // 숫자 배열로 변환

    let reversed = false; // 뒤집혔는지 여부
    let front = 0;
    let back = arr.length;
    let error = false;

    for (let cmd of p) {
      if (cmd === 'R') {
        reversed = !reversed;
      } else if (cmd === 'D') {
        if (front >= back) {
          error = true;
          break;
        }
        if (!reversed) {
          front++;
        } else {
          back--;
        }
      }
    }

    if (error) {
      results.push('error');
    } else {
      let sliced = arr.slice(front, back);
      if (reversed) sliced.reverse();
      results.push(`[${sliced.join(',')}]`);
    }
  }

  console.log(results.join('\n'));
});
