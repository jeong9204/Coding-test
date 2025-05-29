const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ').map(Number);

const [N, K] = input;
const MAX = 100001;
const visited = new Array(MAX).fill(false);
const time = new Array(MAX).fill(Infinity);

const deque = [];
deque.push(N);
time[N] = 0;

while (deque.length > 0) {
  const current = deque.shift();

  if (current === K) break;

  // 순간이동 (가중치 0) → 앞에 넣기
  if (current * 2 < MAX && time[current * 2] > time[current]) {
    time[current * 2] = time[current];
    deque.unshift(current * 2);
  }

  // -1 이동 (가중치 1)
  if (current - 1 >= 0 && time[current - 1] > time[current] + 1) {
    time[current - 1] = time[current] + 1;
    deque.push(current - 1);
  }

  // +1 이동 (가중치 1)
  if (current + 1 < MAX && time[current + 1] > time[current] + 1) {
    time[current + 1] = time[current] + 1;
    deque.push(current + 1);
  }
}

console.log(time[K]);
