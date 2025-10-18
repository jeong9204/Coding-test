// BOJ 1202 - 보석 도둑
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const N = data[p++], K = data[p++];

// 보석: [weight, value]
const jewels = new Array(N);
for (let i = 0; i < N; i++) {
  const m = data[p++], v = data[p++];
  jewels[i] = [m, v];
}

// 가방 용량들
const bags = new Array(K);
for (let i = 0; i < K; i++) bags[i] = data[p++];

/* --------- 정렬 --------- */
// 보석: 무게 오름차순
jewels.sort((a, b) => a[0] - b[0]);
// 가방: 용량 오름차순
bags.sort((a, b) => a - b);

/* --------- 최대 힙 구현 (가격 기준) --------- */
class MaxHeap {
  constructor() { this.a = []; }
  push(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;
    // up-heap
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p] >= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    if (a.length === 0) return undefined;
    const top = a[0];
    const last = a.pop();
    if (a.length > 0) {
      a[0] = last;
      // down-heap
      let i = 0;
      const n = a.length;
      while (true) {
        let l = i * 2 + 1, r = l + 1, largest = i;
        if (l < n && a[l] > a[largest]) largest = l;
        if (r < n && a[r] > a[largest]) largest = r;
        if (largest === i) break;
        [a[i], a[largest]] = [a[largest], a[i]];
        i = largest;
      }
    }
    return top;
  }
  get size() { return this.a.length; }
}

/* --------- 메인 로직 --------- */
let j = 0; // jewels 인덱스 (무게 오름차순으로 스캔)
const pq = new MaxHeap();
let total = 0;

for (let i = 0; i < K; i++) {
  const cap = bags[i];
  // 현재 가방(cap)에 들어갈 수 있는 모든 보석(무게 <= cap)을 후보군에 넣기
  while (j < N && jewels[j][0] <= cap) {
    pq.push(jewels[j][1]); // 가격만 힙에 저장
    j++;
  }
  // 후보군 중 가장 비싼 보석을 이 가방에 담기
  if (pq.size > 0) {
    total += pq.pop();
  }
}

console.log(total.toString());
