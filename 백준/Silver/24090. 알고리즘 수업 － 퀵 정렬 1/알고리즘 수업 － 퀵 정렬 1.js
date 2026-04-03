const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

let swapCount = 0;
let answer = null;

function recordSwap(a, b) {
  swapCount++;

  if (swapCount === K) {
    answer = [Math.min(a, b), Math.max(a, b)];
  }
}

function swap(arr, i, j) {
  const left = arr[i];
  const right = arr[j];

  recordSwap(left, right);

  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(arr, p, r) {
  const x = arr[r];
  let i = p - 1;

  for (let j = p; j <= r - 1; j++) {
    if (arr[j] <= x) {
      i++;
      swap(arr, i, j);
    }
  }

  if (i + 1 !== r) {
    swap(arr, i + 1, r);
  }

  return i + 1;
}

function quickSort(arr, p, r) {
  if (p < r) {
    const q = partition(arr, p, r);
    quickSort(arr, p, q - 1);
    quickSort(arr, q + 1, r);
  }
}

quickSort(A, 0, N - 1);

if (answer === null) {
  console.log(-1);
} else {
  console.log(answer[0], answer[1]);
}