const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(Number(line));
}).on('close', () => {
  const N = input[0];
  const cards = input.slice(1);

  if (N === 1) {
    console.log(0);
    return;
  }

  // 최소 힙 구현
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    push(value) {
      this.heap.push(value);
      this.bubbleUp();
    }

    pop() {
      const top = this.heap[0];
      const end = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.bubbleDown();
      }
      return top;
    }

    bubbleUp() {
      let idx = this.heap.length - 1;
      const element = this.heap[idx];

      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        let parent = this.heap[parentIdx];

        if (element >= parent) break;
        this.heap[parentIdx] = element;
        this.heap[idx] = parent;
        idx = parentIdx;
      }
    }

    bubbleDown() {
      let idx = 0;
      const length = this.heap.length;
      const element = this.heap[0];

      while (true) {
        let leftIdx = 2 * idx + 1;
        let rightIdx = 2 * idx + 2;
        let left, right;
        let swap = null;

        if (leftIdx < length) {
          left = this.heap[leftIdx];
          if (left < element) {
            swap = leftIdx;
          }
        }

        if (rightIdx < length) {
          right = this.heap[rightIdx];
          if (
            (swap === null && right < element) ||
            (swap !== null && right < left)
          ) {
            swap = rightIdx;
          }
        }

        if (swap === null) break;
        this.heap[idx] = this.heap[swap];
        this.heap[swap] = element;
        idx = swap;
      }
    }

    size() {
      return this.heap.length;
    }
  }

  const heap = new MinHeap();
  for (let card of cards) heap.push(card);

  let total = 0;

  while (heap.size() > 1) {
    const a = heap.pop();
    const b = heap.pop();
    const sum = a + b;
    total += sum;
    heap.push(sum);
  }

  console.log(total);
});
