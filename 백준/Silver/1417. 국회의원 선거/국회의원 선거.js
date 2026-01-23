const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = input[idx++];

if (N === 1) {
  console.log(0);
  process.exit(0);
}

let me = input[idx++];

// -------- 최대 힙 구현 --------
class MaxHeap {
  constructor() {
    this.a = [];
  }
  size() {
    return this.a.length;
  }
  peek() {
    return this.a[0];
  }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] >= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const top = a[0];
    const last = a.pop();
    if (a.length > 0) {
      a[0] = last;
      let i = 0;
      while (true) {
        let l = i * 2 + 1;
        let r = l + 1;
        let best = i;

        if (l < a.length && a[l] > a[best]) best = l;
        if (r < a.length && a[r] > a[best]) best = r;
        if (best === i) break;

        [a[i], a[best]] = [a[best], a[i]];
        i = best;
      }
    }
    return top;
  }
}

const heap = new MaxHeap();
for (let i = 1; i < N; i++) {
  heap.push(input[idx++]);
}

// -------- 그리디 시뮬레이션 --------
let bribed = 0;

while (heap.peek() >= me) {
  let mx = heap.pop();
  mx -= 1;     // 그 후보 표 1 감소
  me += 1;     // 내 표 1 증가
  bribed += 1;
  heap.push(mx);
}

console.log(bribed);
