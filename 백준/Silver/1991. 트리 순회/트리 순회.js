const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = +input[0];
const tree = {};

// 트리 구성
for (let i = 1; i <= N; i++) {
  const [parent, left, right] = input[i].split(' ');
  tree[parent] = [left, right];
}

// 전위 순회: 루트 → 왼쪽 → 오른쪽
function preorder(node) {
  if (node === '.' || !node) return '';
  const [left, right] = tree[node];
  return node + preorder(left) + preorder(right);
}

// 중위 순회: 왼쪽 → 루트 → 오른쪽
function inorder(node) {
  if (node === '.' || !node) return '';
  const [left, right] = tree[node];
  return inorder(left) + node + inorder(right);
}

// 후위 순회: 왼쪽 → 오른쪽 → 루트
function postorder(node) {
  if (node === '.' || !node) return '';
  const [left, right] = tree[node];
  return postorder(left) + postorder(right) + node;
}

// 출력
console.log(preorder('A'));
console.log(inorder('A'));
console.log(postorder('A'));
