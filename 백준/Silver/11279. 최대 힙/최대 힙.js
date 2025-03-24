const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(Number(line.trim()));
}).on('close', () => {
  input.shift(); // 첫 줄은 연산의 개수 N
  const maxHeap = [];
  const result = [];

  const insert = (num) => {
    maxHeap.push(num);
    let i = maxHeap.length - 1;
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (maxHeap[parent] < maxHeap[i]) {
        [maxHeap[parent], maxHeap[i]] = [maxHeap[i], maxHeap[parent]];
        i = parent;
      } else break;
    }
  };

  const pop = () => {
    if (maxHeap.length === 0) return 0;
    const max = maxHeap[0];
    const last = maxHeap.pop();
    if (maxHeap.length === 0) return max;
    maxHeap[0] = last;

    let i = 0;
    while (true) {
      let left = i * 2 + 1;
      let right = i * 2 + 2;
      let largest = i;

      if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) {
        largest = left;
      }
      if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) {
        largest = right;
      }
      if (largest === i) break;

      [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
      i = largest;
    }

    return max;
  };

  for (const x of input) {
    if (x === 0) {
      result.push(pop());
    } else {
      insert(x);
    }
  }

  console.log(result.join('\n'));
});
