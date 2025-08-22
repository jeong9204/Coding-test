// BOJ 14499 주사위 굴리기
// 입력: N M x y K, N줄의 지도, K개의 명령
// 출력: 유효 이동마다 주사위 윗면 값

const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let p = 0;

const N = tokens[p++], M = tokens[p++], startX = tokens[p++], startY = tokens[p++], K = tokens[p++];
const board = Array.from({ length: N }, () => Array.from({ length: M }, () => tokens[p++]));
const cmds = tokens.slice(p, p + K);

// 주사위 6면: [top, bottom, north, south, east, west]
let dice = [0, 0, 0, 0, 0, 0];
let x = startX, y = startY;

const out = [];

function inRange(nx, ny) {
  return nx >= 0 && nx < N && ny >= 0 && ny < M;
}

function roll(dir) {
  const [T, B, Nf, Sf, E, W] = dice;
  // dir: 1=동, 2=서, 3=북, 4=남
  if (dir === 1)      dice = [W, E, Nf, Sf, T, B]; // 동
  else if (dir === 2) dice = [E, W, Nf, Sf, B, T]; // 서
  else if (dir === 3) dice = [Sf, Nf, T, B, E, W]; // 북
  else if (dir === 4) dice = [Nf, Sf, B, T, E, W]; // 남
}

for (const cmd of cmds) {
  let nx = x, ny = y;
  if (cmd === 1) ny++;
  else if (cmd === 2) ny--;
  else if (cmd === 3) nx--;
  else if (cmd === 4) nx++;

  if (!inRange(nx, ny)) continue; // 바깥으로 가면 명령 무시

  // 이동 확정
  x = nx; y = ny;
  roll(cmd); // 주사위 회전

  // 복사 규칙
  if (board[x][y] === 0) {
    board[x][y] = dice[1]; // 바닥면 -> 칸
  } else {
    dice[1] = board[x][y]; // 칸 -> 바닥면
    board[x][y] = 0;
  }

  out.push(String(dice[0])); // 윗면 출력
}

console.log(out.join('\n'));
