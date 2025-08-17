const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const lines = [];
rl.on('line', (line) => lines.push(line.trim()))
  .on('close', () => {
    const N = Number(lines[0]);
    const reqs = lines[1].split(' ').map(Number);
    const M = Number(lines[2]);

    const maxReq = Math.max(...reqs);
    const totalReq = reqs.reduce((a, b) => a + b, 0);

    // 1) 전부 배정 가능하면 최댓값은 요청의 최댓값
    if (totalReq <= M) {
      console.log(maxReq);
      return;
    }

    // 2) 이분 탐색으로 상한(cap) 최대화
    let lo = 0, hi = maxReq, ans = 0;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2); // 후보 상한 cap
      // cap=mid일 때 총 배정액 계산
      let sum = 0;
      for (let i = 0; i < N; i++) {
        sum += reqs[i] < mid ? reqs[i] : mid;
        // 합이 이미 M을 훌쩍 넘으면 일찍 끊어도 됨(미세 최적화)
        if (sum > M) break;
      }

      if (sum <= M) {
        // 더 올릴 수 있음 → 정답 후보 갱신 후 오른쪽으로
        ans = mid;
        lo = mid + 1;
      } else {
        // 너무 큼 → 왼쪽으로 내리기
        hi = mid - 1;
      }
    }

    console.log(ans);
  });
