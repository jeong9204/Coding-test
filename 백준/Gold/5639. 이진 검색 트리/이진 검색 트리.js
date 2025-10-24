// BOJ 5639 - 이진 검색 트리
// Node.js (ECMAScript 2021)

'use strict';
const fs = require('fs');

// 입력: 여러 줄, 마지막 줄 없을 수도 있으니 filter(Boolean)로 빈 줄 제거
const input = fs.readFileSync(0, 'utf8').trim().split('\n').filter(Boolean).map(Number);

// 전위 순회 결과 배열
const pre = input;
const n = pre.length;

let answer = [];
// buildPost(l, r): pre[l..r] 구간이 이루는 BST의 후위 순회 결과를 answer에 push
function buildPost(l, r) {
  if (l > r) return;
  if (l === r) {
    answer.push(pre[l]);
    return;
  }

  const root = pre[l];

  // 왼쪽/오른쪽 경계 찾기:
  // 전위 순서에서 루트 다음부터 시작해서
  // root보다 큰 값이 처음 나오는 지점이 오른쪽 서브트리 시작
  let mid = l + 1;
  while (mid <= r && pre[mid] < root) {
    mid++;
  }
  // 이제 pre[l+1 .. mid-1] 는 왼쪽 서브트리
  //     pre[mid .. r]     는 오른쪽 서브트리

  buildPost(l + 1, mid - 1); // 왼쪽
  buildPost(mid, r);         // 오른쪽
  answer.push(root);         // 루트 (후위: left, right, root)
}

buildPost(0, n - 1);

// 출력
process.stdout.write(answer.join('\n'));
