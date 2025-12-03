// BOJ 2075 N번째 큰 수 - 메모리 초과 방지 Node.js 코드
// 핵심: readline + 문자 단위 파서 + 크기 N짜리 최소 힙만 유지

const readline = require('readline');

class MinHeap {
  constructor() {
    this.a = []; // 0-based 배열 사용
  }
  get size() {
    return this.a.length;
  }
  peek() {
    return this.a[0];
  }
  add(x) {
    const a = this.a;
    a.push(x);
    let i = a.length - 1;

    // 위로 올리기 (bubble-up)
    while (i > 0) {
      const p = (i - 1) >> 1; // 부모 인덱스
      if (a[p] <= a[i]) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.a;
    const n = a.length;
    if (n === 0) return null;
    if (n === 1) return a.pop();

    const min = a[0];
    a[0] = a.pop();
    let i = 0;

    // 아래로 내리기 (bubble-down)
    while (true) {
      const l = (i << 1) + 1;
      const r = l + 1;
      let s = i;

      if (l < a.length && a[l] < a[s]) s = l;
      if (r < a.length && a[r] < a[s]) s = r;
      if (s === i) break;

      [a[i], a[s]] = [a[s], a[i]];
      i = s;
    }
    return min;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const heap = new MinHeap();
let N = -1;          // 표 크기
let rowsLeft = 0;    // 아직 읽어야 할 행 수

rl.on('line', line => {
  if (N === -1) {
    // 첫 줄: N
    N = Number(line.trim());
    rowsLeft = N;
    return;
  }

  // 두 번째 줄부터는 숫자들이 있는 줄
  // split() 없이 문자 단위로 직접 파싱한다.
  let num = 0;
  let sign = 1;
  let inNumber = false; // 숫자 토큰 읽는 중인지

  // 마지막 숫자를 처리하기 위해 line.length까지가 아니라 <= 사용하고
  // 끝에 가상의 공백이 하나 있다고 생각하고 처리
  for (let i = 0; i <= line.length; i++) {
    const ch = line[i];

    if (ch === '-') {
      // 음수 시작
      sign = -1;
      num = 0;
      inNumber = true;
    } else if (ch >= '0' && ch <= '9') {
      // 숫자 누적
      num = num * 10 + (ch.charCodeAt(0) - 48);
      inNumber = true;
    } else {
      // 공백 또는 undefined(줄 끝) → 지금까지 읽은 숫자 하나 확정
      if (inNumber) {
        const val = sign * num;

        if (heap.size < N) {
          // 아직 N개 안 찼으면 무조건 넣기
          heap.add(val);
        } else {
          // 이미 N개 찼으면, 현재 N번째 큰 수보다 클 때만 교체
          if (val > heap.peek()) {
            heap.pop();
            heap.add(val);
          }
        }

        // 다음 숫자를 위해 상태 초기화
        num = 0;
        sign = 1;
        inNumber = false;
      }
      // 공백이나 기타 문자는 그냥 스킵
    }
  }

  rowsLeft--;
  if (rowsLeft === 0) {
    rl.close();
  }
});

rl.on('close', () => {
  console.log(heap.peek());
  process.exit(0);
});
