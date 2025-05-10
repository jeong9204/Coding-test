const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => input.push(line)).on('close', () => {
  const N = Number(input[0]);
  const map = input.slice(1).map(line => line.split('').map(Number));

  const compress = (x, y, size) => {
    const first = map[x][y];
    let isSame = true;

    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (map[i][j] !== first) {
          isSame = false;
          break;
        }
      }
      if (!isSame) break;
    }

    if (isSame) return first.toString();

    const half = size / 2;
    return '('
      + compress(x, y, half) // 왼쪽 위
      + compress(x, y + half, half) // 오른쪽 위
      + compress(x + half, y, half) // 왼쪽 아래
      + compress(x + half, y + half, half) // 오른쪽 아래
      + ')';
  };

  const result = compress(0, 0, N);
  console.log(result);
});
