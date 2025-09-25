// BOJ 1655 - 가운데를 말해요
// 두 힙(최대힙, 최소힙)으로 온라인 중앙값 유지

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const N = input[p++];

class Heap {
  constructor(cmp) {
    this.a = [];
    this.cmp = cmp; // (x, y) => x가 y보다 앞서야 하면 true
  }
  size() { return this.a.length; }
  peek() { return this.a[0]; }
  push(x) {
    const a = this.a, cmp = this.cmp;
    a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (cmp(a[i], a[parent])) {
        [a[i], a[parent]] = [a[parent], a[i]];
        i = parent;
      } else break;
    }
  }
  pop() {
    const a = this.a, cmp = this.cmp;
    if (a.length === 0) return undefined;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      while (true) {
        const l = i * 2 + 1, r = i * 2 + 2;
        let best = i;
        if (l < a.length && cmp(a[l], a[best])) best = l;
        if (r < a.length && cmp(a[r], a[best])) best = r;
        if (best !== i) {
          [a[i], a[best]] = [a[best], a[i]];
          i = best;
        } else break;
      }
    }
    return top;
  }
}

// 최대힙: 큰 것이 앞으로 오도록
const maxHeap = new Heap((x, y) => x > y);
// 최소힙: 작은 것이 앞으로 오도록
const minHeap = new Heap((x, y) => x < y);

const out = [];

for (let i = 0; i < N; i++) {
  const x = input[p++];

  // 1) 일단 maxHeap에 넣기
  maxHeap.push(x);

  // 2) 크기 균형: max는 min보다 많아야 하되 최대 1개 차이
  if (maxHeap.size() > minHeap.size() + 1) {
    minHeap.push(maxHeap.pop());
  }

  // 3) 순서 조건 확인: max.peek() <= min.peek()
  if (minHeap.size() > 0 && maxHeap.peek() > minHeap.peek()) {
    const a = maxHeap.pop();
    const b = minHeap.pop();
    maxHeap.push(b);
    minHeap.push(a);
  }

  // 4) 다시 크기 균형 확인(드물지만 교환 후 깨질 수 있음)
  if (maxHeap.size() > minHeap.size() + 1) {
    minHeap.push(maxHeap.pop());
  } else if (minHeap.size() > maxHeap.size()) {
    maxHeap.push(minHeap.pop());
  }

  // 현재 중앙값 = maxHeap 루트
  out.push(String(maxHeap.peek()));
}

console.log(out.join('\n'));
