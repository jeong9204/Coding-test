// BOJ 11004 - K번째 수
// 전략: Buffer 직접 파싱 + Int32Array 저장 + Quickselect (median-of-three + Hoare)

const fs = require('fs');
const data = fs.readFileSync(0); // Buffer (바이너리)

// ---- fast integer parser from Buffer ----
let idx = 0;
const len = data.length;
function nextInt() {
  // 공백/개행 건너뛰기
  while (idx < len) {
    const c = data[idx];
    if (c === 45 || (c >= 48 && c <= 57)) break; // '-' or digit
    idx++;
  }
  if (idx >= len) return null;

  let sign = 1;
  if (data[idx] === 45) { // '-'
    sign = -1;
    idx++;
  }

  let num = 0;
  while (idx < len) {
    const c = data[idx];
    if (c < 48 || c > 57) break;
    num = num * 10 + (c - 48);
    idx++;
  }
  return sign * num;
}

// ---- read N, K and array ----
const N = nextInt();
const K = nextInt(); // 1-indexed
const arr = new Int32Array(N);
for (let i = 0; i < N; i++) arr[i] = nextInt();

// ---- quickselect (find k-th smallest, 0-indexed) ----
function swap(i, j) {
  const t = arr[i];
  arr[i] = arr[j];
  arr[j] = t;
}

function quickselect(k) {
  let left = 0, right = N - 1;

  while (left <= right) {
    // median-of-three pivot 선택
    let mid = (left + right) >>> 1;
    if (arr[left] > arr[mid]) swap(left, mid);
    if (arr[left] > arr[right]) swap(left, right);
    if (arr[mid] > arr[right]) swap(mid, right);
    const pivot = arr[mid];

    // Hoare 파티션
    let i = left, j = right;
    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;
      if (i <= j) {
        swap(i, j);
        i++; j--;
      }
    }

    // 이제 [left..j] < pivot, [i..right] > pivot
    if (k <= j) {
      right = j;
    } else if (k >= i) {
      left = i;
    } else {
      // k가 pivot 값 영역에 위치 → pivot 값이 곧 답
      return pivot;
    }
  }
  return arr[k];
}

const ans = quickselect(K - 1); // 0-index로 변환
console.log(String(ans));
