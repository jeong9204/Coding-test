const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', function (line) {
  input.push(line.trim());
}).on('close', function () {
  const [M, N, H] = input[0].split(' ').map(Number);
  const boxes = [];
  for (let h = 0; h < H; h++) {
    const layer = [];
    for (let n = 0; n < N; n++) {
      layer.push(input[1 + h * N + n].split(' ').map(Number));
    }
    boxes.push(layer);
  }

  const dz = [0, 0, 0, 0, 1, -1];
  const dy = [-1, 1, 0, 0, 0, 0];
  const dx = [0, 0, -1, 1, 0, 0];

  const queue = [];
  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (boxes[z][y][x] === 1) {
          queue.push([z, y, x]);
        }
      }
    }
  }

  let index = 0;
  while (index < queue.length) {
    const [z, y, x] = queue[index++];
    for (let d = 0; d < 6; d++) {
      const nz = z + dz[d];
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (
        nz >= 0 && nz < H &&
        ny >= 0 && ny < N &&
        nx >= 0 && nx < M &&
        boxes[nz][ny][nx] === 0
      ) {
        boxes[nz][ny][nx] = boxes[z][y][x] + 1;
        queue.push([nz, ny, nx]);
      }
    }
  }

  let days = 0;
  for (let z = 0; z < H; z++) {
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (boxes[z][y][x] === 0) {
          console.log(-1);
          return;
        }
        days = Math.max(days, boxes[z][y][x]);
      }
    }
  }

  console.log(days - 1);
});
