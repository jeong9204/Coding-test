const fs = require('fs');
const data = fs.readFileSync(0, 'utf8');

// -------- 빠른 토큰 파서 --------
let p = 0, L = data.length;
function nextToken() {
  while (p < L && data.charCodeAt(p) <= 32) p++;
  if (p >= L) return null;
  let s = p;
  while (p < L && data.charCodeAt(p) > 32) p++;
  return data.slice(s, p);
}
function nextInt() { return parseInt(nextToken(), 10); }

// -------- 메모리 절약 힙 (값/ID 평행 배열) --------
class Heap {
  constructor(isMin) {
    this.v = []; // values
    this.i = []; // ids
    this.n = 0;  // size
    this.isMin = isMin; // true => min-heap, false => max-heap
  }
  size() { return this.n; }
  peekVal() { return this.n ? this.v[0] : undefined; }
  peekId() { return this.n ? this.i[0] : undefined; }

  _better(a, b) { // index compare
    return this.isMin ? (this.v[a] < this.v[b]) : (this.v[a] > this.v[b]);
  }
  _swap(a, b) {
    const tv = this.v[a], ti = this.i[a];
    this.v[a] = this.v[b]; this.i[a] = this.i[b];
    this.v[b] = tv;        this.i[b] = ti;
  }
  push(val, id) {
    let a = this.n++;
    this.v[a] = val;
    this.i[a] = id;
    // up-heap
    while (a > 0) {
      const p = (a - 1) >> 1;
      if (!this._better(a, p)) break;
      this._swap(a, p);
      a = p;
    }
  }
  pop() {
    if (!this.n) return null;
    const top = { val: this.v[0], id: this.i[0] };
    const last = this.n - 1;
    // move last to root
    this.v[0] = this.v[last]; this.i[0] = this.i[last];
    this.n--;
    this.v.length = this.n; this.i.length = this.n;
    // down-heap
    let a = 0;
    while (true) {
      let l = a * 2 + 1, r = l + 1, best = a;
      if (l < this.n && this._better(l, best)) best = l;
      if (r < this.n && this._better(r, best)) best = r;
      if (best === a) break;
      this._swap(a, best);
      a = best;
    }
    return top;
  }
}

// -------- 메인 --------
const T = nextInt();
const out = [];

for (let tc = 0; tc < T; tc++) {
  const k = nextInt();

  const maxH = new Heap(false);
  const minH = new Heap(true);

  // Uint8Array로 방문(유효성) 플래그 관리: 0=삭제됨, 1=유효
  const visited = new Uint8Array(k);
  let curId = 0;

  const cleanTop = (heap) => {
    while (heap.size()) {
      const id = heap.peekId();
      if (visited[id] === 0) heap.pop();
      else break;
    }
  };

  for (let i = 0; i < k; i++) {
    const op = nextToken(); // 'I' or 'D'
    const num = nextInt();

    if (op === 'I') {
      maxH.push(num, curId);
      minH.push(num, curId);
      visited[curId] = 1;
      curId++;
    } else { // 'D'
      if (num === 1) {
        cleanTop(maxH);
        if (maxH.size()) {
          const { id } = maxH.pop();
          if (visited[id]) visited[id] = 0;
        }
      } else { // -1
        cleanTop(minH);
        if (minH.size()) {
          const { id } = minH.pop();
          if (visited[id]) visited[id] = 0;
        }
      }
    }
  }

  // 최종 정리
  cleanTop(maxH);
  cleanTop(minH);

  if (!maxH.size() || !minH.size()) out.push('EMPTY');
  else out.push(`${maxH.peekVal()} ${minH.peekVal()}`);
}

console.log(out.join('\n'));
