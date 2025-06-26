const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, m, k] = input[0].split(' ').map(Number);
const nums = input.slice(1, n + 1).map(BigInt);
const commands = input.slice(n + 1).map(line => line.split(' ').map(BigInt));

const size = 2 ** Math.ceil(Math.log2(n)) * 2;
const segTree = Array(size).fill(0n);

// 세그먼트 트리 초기화
function init(node, start, end) {
  if (start === end) {
    segTree[node] = nums[start];
  } else {
    const mid = Math.floor((start + end) / 2);
    init(node * 2, start, mid);
    init(node * 2 + 1, mid + 1, end);
    segTree[node] = segTree[node * 2] + segTree[node * 2 + 1];
  }
}
init(1, 0, n - 1);

// 구간 합 구하기
function query(node, start, end, left, right) {
  if (right < start || end < left) return 0n;
  if (left <= start && end <= right) return segTree[node];
  const mid = Math.floor((start + end) / 2);
  return query(node * 2, start, mid, left, right) + query(node * 2 + 1, mid + 1, end, left, right);
}

// 값 갱신
function update(node, start, end, idx, value) {
  if (idx < start || idx > end) return;
  if (start === end) {
    segTree[node] = value;
    return;
  }
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, idx, value);
  update(node * 2 + 1, mid + 1, end, idx, value);
  segTree[node] = segTree[node * 2] + segTree[node * 2 + 1];
}

const result = [];

for (const [a, b, c] of commands) {
  if (a === 1n) {
    update(1, 0, n - 1, Number(b - 1n), c);
  } else {
    result.push(query(1, 0, n - 1, Number(b - 1n), Number(c - 1n)).toString());
  }
}

console.log(result.join('\n'));
