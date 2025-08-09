// BOJ 17219 비밀번호 찾기 - Node.js (readline)
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = 0, M = 0;
let phase = 0;       // 0: N M, 1: N개 (주소, 비번), 2: M개(질의)
let count = 0;

const dict = new Map(); // 주소 -> 비밀번호
const out = [];

rl.on('line', (line) => {
  if (phase === 0) {
    const [nStr, mStr] = line.trim().split(' ');
    N = +nStr; M = +mStr;
    phase = 1;
  } else if (phase === 1) {
    // N개의 (주소, 비밀번호)
    const [site, pwd] = line.trim().split(' ');
    dict.set(site, pwd);
    count++;
    if (count === N) {
      phase = 2;
      count = 0;
    }
  } else {
    // M개의 질의 (주소만 들어옴)
    const site = line.trim();
    // 문제에서 반드시 존재한다고 했지만, 혹시 몰라서 || '' 처리
    out.push(dict.get(site) || '');
    count++;
    if (count === M) rl.close();
  }
});

rl.on('close', () => {
  console.log(out.join('\n'));
});
