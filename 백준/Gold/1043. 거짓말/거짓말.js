const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n').map(l => l.trim());

let idx = 0;
const [N, M] = input[idx++].split(' ').map(Number);

// 진실 아는 사람들
const truthLine = input[idx++].split(' ').map(Number);
const T = truthLine[0];
const truth = T === 0 ? [] : truthLine.slice(1);

// 파티 정보 읽기
const parties = [];
for (let t = 0; t < M; t++) {
  const arr = input[idx++].split(' ').map(Number);
  const k = arr[0];
  parties.push(arr.slice(1)); // 참석자 목록
}

// --- Union-Find 구현 ---
const parent = Array.from({ length: N + 1 }, (_, i) => i);
function find(x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent[x]);
  return parent[x];
}
function union(a, b) {
  a = find(a); b = find(b);
  if (a === b) return;
  parent[b] = a;
}

// 1) 같은 파티 참석자들을 전부 union
for (const people of parties) {
  if (people.length <= 1) continue;
  const first = people[0];
  for (let i = 1; i < people.length; i++) {
    union(first, people[i]);
  }
}

// 2) 진실을 아는 사람들의 대표(root) 집합 만들기
const truthRoots = new Set();
for (const p of truth) {
  truthRoots.add(find(p));
}

// 3) 각 파티가 과장이 가능한지 확인
let answer = 0;
for (const people of parties) {
  let canExaggerate = true;
  for (const p of people) {
    if (truthRoots.has(find(p))) {
      canExaggerate = false;
      break;
    }
  }
  if (canExaggerate) answer++;
}

console.log(answer.toString());
