// BOJ 13909 창문 닫기 (같은 유형)
// Node.js (BigInt) - integer sqrt by binary search

const fs = require('fs');

const input = fs.readFileSync(0, 'utf8').trim();
const N = BigInt(input);

// floorSqrt(x): returns floor(sqrt(x)) for BigInt x >= 0
function floorSqrt(x) {
  if (x < 2n) return x;

  let lo = 1n;
  let hi = x; // sqrt(x) <= x (for x>=1), so safe upper bound

  while (lo <= hi) {
    const mid = (lo + hi) >> 1n; // (lo+hi)/2
    const sq = mid * mid;

    if (sq === x) return mid;
    if (sq < x) lo = mid + 1n;
    else hi = mid - 1n;
  }
  // when loop ends, hi is the largest mid with mid^2 <= x
  return hi;
}

const ans = floorSqrt(N);
console.log(ans.toString());
