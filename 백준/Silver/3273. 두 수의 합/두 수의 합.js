const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const n = Number(input[0]);
  const arr = input[1].split(' ').map(Number);
  const x = Number(input[2]);

  arr.sort((a, b) => a - b); // 정렬
  let count = 0;
  let start = 0;
  let end = n - 1;

  while (start < end) {
    const sum = arr[start] + arr[end];

    if (sum === x) {
      count++;
      start++;
      end--;
    } else if (sum < x) {
      start++;
    } else {
      end--;
    }
  }

  console.log(count);
});
