// BOJ 2565 - 전깃줄
// 풀이: A로 정렬 후, B의 LIS 길이 구하기 → N - LIS
// LIS는 O(N log N) (patience sorting)로 계산

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const lines = [];
rl.on('line', line => lines.push(line.trim()));
rl.on('close', () => {
  const N = Number(lines[0]);

  // 모든 숫자를 모아서 파싱(혹시 공백/줄바꿈 섞여 들어오는 경우 대비)
  const nums = lines.slice(1).join(' ').split(/\s+/).map(Number);

  const wires = [];
  for (let i = 0; i < N; i++) {
    const a = nums[2 * i];
    const b = nums[2 * i + 1];
    wires.push([a, b]);
  }

  // 1) A 기준 정렬 (A가 같을 일은 없지만 안전하게 B도 보조 정렬)
  wires.sort((p, q) => (p[0] === q[0] ? p[1] - q[1] : p[0] - q[0]));

  // 2) B만 뽑아 LIS
  const arrB = wires.map(pair => pair[1]);

  // LIS (strictly increasing) - patience / lower_bound
  const tails = []; // tails[len] = 길이가 len+1인 증가 부분수열의 마지막 값의 최소치

  for (const x of arrB) {
    let lo = 0, hi = tails.length;
    // strictly increasing → lower_bound(x)
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    // lo는 x가 들어갈 위치
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }

  const lisLen = tails.length;
  const answer = N - lisLen;
  console.log(answer);
});
