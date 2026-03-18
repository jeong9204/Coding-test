const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

// 임시 배열 (매 merge마다 새로 만들면 비효율적이므로 하나 크게 만들어 둠)
const tmp = new Array(N);

let count = 0;
let answer = -1;

function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  let i = left;
  let j = mid + 1;
  let t = left;

  // 두 구간을 오름차순으로 tmp에 저장
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      tmp[t++] = arr[i++];
    } else {
      tmp[t++] = arr[j++];
    }
  }

  // 왼쪽 부분이 남은 경우
  while (i <= mid) {
    tmp[t++] = arr[i++];
  }

  // 오른쪽 부분이 남은 경우
  while (j <= right) {
    tmp[t++] = arr[j++];
  }

  // tmp를 다시 arr에 복사
  for (let k = left; k <= right; k++) {
    arr[k] = tmp[k];
    count++;

    if (count === K) {
      answer = arr[k];
    }
  }
}

mergeSort(A, 0, N - 1);

console.log(answer);