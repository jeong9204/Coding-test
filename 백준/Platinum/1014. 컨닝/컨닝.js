// 백준 1014: 컨닝
// Node.js (JavaScript) 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const C = parseInt(input[idx++], 10); // 테스트케이스 수
const outputs = [];

for (let tc = 0; tc < C; tc++) {
  const N = parseInt(input[idx++], 10);
  const M = parseInt(input[idx++], 10);

  const classroom = [];
  for (let r = 0; r < N; r++) {
    classroom.push(input[idx++]); // 예: "....x..."
  }

  // 1. 각 행별로 앉을 수 있는 자리(seatMask)를 비트마스크로 만든다.
  const seatMask = new Array(N);
  for (let r = 0; r < N; r++) {
    let mask = 0;
    for (let c = 0; c < M; c++) {
      if (classroom[r][c] === '.') {
        mask |= (1 << c);
      }
    }
    seatMask[r] = mask;
  }

  const maxMask = 1 << M;

  // 2. 모든 mask에 대해:
  //    - 같은 행에서 인접한 학생이 없는지 (mask & (mask << 1)) == 0
  //    - 그 mask에서의 학생 수(비트 수)를 미리 구해둔다.
  const allValidMasks = [];
  const bitCount = new Array(maxMask);
  for (let mask = 0; mask < maxMask; mask++) {
    if (mask & (mask << 1)) {
      // 같은 행에서 인접 좌석에 동시에 앉음 -> 불가능
      continue;
    }

    let cnt = 0;
    let tmp = mask;
    while (tmp) {
      tmp &= (tmp - 1); // 최하위 1비트씩 제거하면서 개수 세기
      cnt++;
    }
    bitCount[mask] = cnt;
    allValidMasks.push(mask);
  }

  // 3. 각 행별로 실제로 가능한 mask 리스트(rowMasks)를 만든다.
  const rowMasks = [];
  for (let r = 0; r < N; r++) {
    const seat = seatMask[r];
    const list = [];
    for (let i = 0; i < allValidMasks.length; i++) {
      const mask = allValidMasks[i];
      // mask가 앉을 수 있는 자리만 사용하는지 확인
      if ((mask & ~seat) === 0) {
        list.push(mask);
      }
    }
    rowMasks.push(list);
  }

  // 4. DP 시작
  //    dpPrev: 이전 행의 mask -> 최대 학생 수
  let dpPrev = new Map();
  dpPrev.set(0, 0); // 아직 아무 행도 안 썼을 때, "빈 마스크"에서 0명

  const half = N / 2; // 이건 이 문제에선 직접 쓰진 않지만 남겨둬도 무해

  for (let r = 0; r < N; r++) {
    const dpCurr = new Map();

    const curList = rowMasks[r];
    for (let i = 0; i < curList.length; i++) {
      const curMask = curList[i];
      const curSeats = bitCount[curMask];

      // 이전 행의 모든 상태와 조합 시도
      for (const entry of dpPrev) {
        const prevMask = entry[0];
        const prevVal = entry[1];

        // 위/아래 행 사이의 대각선 컨닝 체크:
        // (r,c)와 (r-1,c-1), (r-1,c+1)
        if ((curMask & (prevMask << 1)) !== 0) continue;
        if ((curMask & (prevMask >> 1)) !== 0) continue;

        const newVal = prevVal + curSeats;
        const oldVal = dpCurr.has(curMask) ? dpCurr.get(curMask) : -1;

        if (newVal > oldVal) {
          dpCurr.set(curMask, newVal);
        }
      }
    }

    dpPrev = dpCurr;
  }

  // 5. 마지막 행까지 끝났을 때의 최대값이 답
  let ans = 0;
  for (const v of dpPrev.values()) {
    if (v > ans) ans = v;
  }

  outputs.push(String(ans));
}

console.log(outputs.join('\n'));
