// 백준 노드.js 풀이용 템플릿
// 문제: 1766 문제집 (위상 정렬 + 최소 힙)

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const [N, M] = input[0].trim().split(' ').map(Number);

// 인접 리스트 (1 ~ N 사용)
const adj = Array.from({ length: N + 1 }, () => []);
// 진입 차수 배열
const indegree = Array(N + 1).fill(0);

// 간선 정보 입력
for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].trim().split(' ').map(Number);
  adj[A].push(B);
  indegree[B]++;
}

/**
 * 최소 힙 구현 (1-based index)
 * 항상 가장 작은 값이 루트에 온다.
 */
class MinHeap {
  constructor() {
    this.heap = [null]; // 0번 인덱트는 비워둠
  }

  size() {
    return this.heap.length - 1;
  }

  isEmpty() {
    return this.size() === 0;
  }

  push(value) {
    this.heap.push(value);
    let cur = this.heap.length - 1;
    let parent = Math.floor(cur / 2);

    // 부모보다 값이 작으면 위로 올리기
    while (parent > 0 && this.heap[parent] > this.heap[cur]) {
      [this.heap[parent], this.heap[cur]] = [this.heap[cur], this.heap[parent]];
      cur = parent;
      parent = Math.floor(cur / 2);
    }
  }

  pop() {
    if (this.isEmpty()) return null;

    // 루트 값(최소값)
    const min = this.heap[1];

    // 마지막 값을 루트로 옮기고, 아래로 내려가며 정리
    if (this.heap.length === 2) {
      this.heap.pop();
      return min;
    }

    this.heap[1] = this.heap.pop();
    let cur = 1;

    while (true) {
      let left = cur * 2;
      let right = cur * 2 + 1;
      let smallest = cur;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === cur) break;

      [this.heap[cur], this.heap[smallest]] = [this.heap[smallest], this.heap[cur]];
      cur = smallest;
    }

    return min;
  }
}

const heap = new MinHeap();

// 1. 진입 차수가 0인 모든 문제를 힙에 넣음 (바로 풀 수 있는 문제들)
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) {
    heap.push(i);
  }
}

const result = [];

// 2. 위상 정렬 진행
while (!heap.isEmpty()) {
  // 항상 가장 번호가 작은 문제를 꺼냄 → 조건 3 (쉬운 문제부터)
  const cur = heap.pop();
  result.push(cur);

  // cur을 풀었으니까, cur 이후에 풀 수 있는 문제들의 진입 차수 감소
  for (const next of adj[cur]) {
    indegree[next]--;
    // 이제 선행 조건을 모두 만족하면 힙에 넣음
    if (indegree[next] === 0) {
      heap.push(next);
    }
  }
}

// 결과 출력
console.log(result.join(' '));
