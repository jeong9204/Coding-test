'use strict';
const fs = require('fs');

const lines = fs.readFileSync(0, 'utf8').trimEnd().split('\n');
let p = 0;

const T = Number(lines[p++]);
let outputs = [];

for (let tc = 0; tc < T; tc++) {
  // 입력: w h
  let [w, h] = lines[p++].trim().split(' ').map(Number);
  const W = w, H = h;
  const N = W * H;

  // fireTime: 불이 도착하는 시간 (-1 = 안 옴)
  const fireTime = new Int32Array(N);
  fireTime.fill(-1);

  // personDist: 사람이 해당 칸에 도착하는 시간 (-1 = 방문 안 함)
  const dist = new Int32Array(N);
  dist.fill(-1);

  // 불 BFS 큐
  const qFire = new Int32Array(N);
  let fh = 0, ft = 0;

  // 사람 BFS 큐
  const qMan = new Int32Array(N);
  let mh = 0, mt = 0;

  let start = -1;

  // 맵 읽고 초기 큐 세팅
  for (let r = 0; r < H; r++) {
    const row = lines[p++]; // 길이 W
    for (let c = 0; c < W; c++) {
      const ch = row.charCodeAt(c);
      const idx = r * W + c;

      if (ch === 42) { // '*'
        fireTime[idx] = 0;
        qFire[ft++] = idx;
      } else if (ch === 64) { // '@'
        start = idx;
      }
      // 벽/빈칸은 따로 배열로 저장 안 하고, row에서 즉시 판단할 수도 있지만
      // 여기서는 아래에서 다시 row 접근하면 번거로워서, 벽만 체크할 수 있게
      // 별도 저장 없이, 맵을 다시 만들지 않고도 처리하려면 필요.
      // => 그래서 row들을 따로 저장.
    }
  }

  // 위에서 row를 저장하지 않았기 때문에, 다시 접근할 수 있도록
  // 해당 테스트케이스의 map을 다시 구성 (메모리 부담 적음: 1000줄)
  // (입력 처리 구조상 이미 lines에서 줄로 들고 있으니,
  //  위 루프에서 row들을 따로 모아두는 게 가장 깔끔)
  // ----
  // 다시 읽는 대신: 위 루프에서 row들을 저장하자.
  // ----
  // => 구현을 정리해서 다시 작성:

  // (현재 구조는 row를 저장 안 해서 벽 체크가 불가능해짐)
  // 그래서 테스트케이스를 다시 파싱한다:
  p -= H; // 방금 읽은 H줄 되돌리고

  const map = new Array(H);
  // 초기값 재설정
  fireTime.fill(-1);
  dist.fill(-1);
  fh = 0; ft = 0;
  mh = 0; mt = 0;
  start = -1;

  for (let r = 0; r < H; r++) {
    const row = lines[p++];
    map[r] = row;
    for (let c = 0; c < W; c++) {
      const ch = row.charCodeAt(c);
      const idx = r * W + c;

      if (ch === 42) { // '*'
        fireTime[idx] = 0;
        qFire[ft++] = idx;
      } else if (ch === 64) { // '@'
        start = idx;
      }
    }
  }

  // 1) 불 BFS: fireTime 채우기
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];

  while (fh < ft) {
    const cur = qFire[fh++];
    const t = fireTime[cur];
    const r = (cur / W) | 0;
    const c = cur - r * W;

    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];
      if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;

      if (map[nr].charCodeAt(nc) === 35) continue; // '#'
      const ni = nr * W + nc;
      if (fireTime[ni] !== -1) continue;

      fireTime[ni] = t + 1;
      qFire[ft++] = ni;
    }
  }

  // 2) 사람 BFS
  dist[start] = 0;
  qMan[mt++] = start;

  let answer = -1;

  while (mh < mt) {
    const cur = qMan[mh++];
    const t = dist[cur];
    const r = (cur / W) | 0;
    const c = cur - r * W;

    // 가장자리면 다음 1초에 밖으로 나가서 탈출
    if (r === 0 || r === H - 1 || c === 0 || c === W - 1) {
      answer = t + 1;
      break;
    }

    for (let d = 0; d < 4; d++) {
      const nr = r + dr[d];
      const nc = c + dc[d];
      if (nr < 0 || nr >= H || nc < 0 || nc >= W) continue;

      if (map[nr].charCodeAt(nc) === 35) continue; // '#'
      const ni = nr * W + nc;
      if (dist[ni] !== -1) continue;

      const nt = t + 1;

      // 다음 칸이 nt초에 불이 붙거나 이미 불이면 못 들어감
      if (fireTime[ni] !== -1 && fireTime[ni] <= nt) continue;

      dist[ni] = nt;
      qMan[mt++] = ni;
    }
  }

  outputs.push(answer === -1 ? 'IMPOSSIBLE' : String(answer));
}

process.stdout.write(outputs.join('\n'));