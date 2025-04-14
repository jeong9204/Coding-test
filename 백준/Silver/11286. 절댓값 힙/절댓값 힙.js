const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);
const N = input[0];
const commands = input.slice(1);

// 사용자 정의 이진 힙 (절댓값 기준)
class AbsHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (
        Math.abs(this.heap[idx]) < Math.abs(this.heap[parentIdx]) ||
        (Math.abs(this.heap[idx]) === Math.abs(this.heap[parentIdx]) && this.heap[idx] < this.heap[parentIdx])
      ) {
        [this.heap[idx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[idx]];
        idx = parentIdx;
      } else break;
    }
  }

  pop() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    let idx = 0;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (
        left < this.heap.length &&
        (Math.abs(this.heap[left]) < Math.abs(this.heap[smallest]) ||
          (Math.abs(this.heap[left]) === Math.abs(this.heap[smallest]) && this.heap[left] < this.heap[smallest]))
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        (Math.abs(this.heap[right]) < Math.abs(this.heap[smallest]) ||
          (Math.abs(this.heap[right]) === Math.abs(this.heap[smallest]) && this.heap[right] < this.heap[smallest]))
      ) {
        smallest = right;
      }

      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
      idx = smallest;
    }

    return top;
  }
}

const absHeap = new AbsHeap();
const output = [];

for (let i = 0; i < N; i++) {
  const x = commands[i];
  if (x === 0) {
    output.push(absHeap.pop());
  } else {
    absHeap.push(x);
  }
}

console.log(output.join("\n"));
