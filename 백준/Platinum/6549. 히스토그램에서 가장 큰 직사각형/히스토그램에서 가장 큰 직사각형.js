const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let answers = [];

for (const line of input) {
  const nums = line.split(' ').map(Number);
  const n = nums[0];

  if (n === 0) break;

  const heights = nums.slice(1);
  const stack = [];
  let maxArea = 0n;

  // 마지막에 높이 0을 하나 더 본다고 생각해서 스택을 비우게 만든다.
  for (let i = 0; i <= n; i++) {
    const currentHeight = i === n ? 0 : heights[i];

    while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
      const topIndex = stack.pop();
      const height = BigInt(heights[topIndex]);

      let width;
      if (stack.length === 0) {
        width = BigInt(i);
      } else {
        width = BigInt(i - stack[stack.length - 1] - 1);
      }

      const area = height * width;
      if (area > maxArea) {
        maxArea = area;
      }
    }

    stack.push(i);
  }

  answers.push(maxArea.toString());
}

console.log(answers.join('\n'));