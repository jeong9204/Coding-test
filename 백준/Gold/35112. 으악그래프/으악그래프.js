// 으악그래프 판별
// 결론: 연결 그래프에서 "임의의 서로 다른 두 간선을 제거하면 항상 단절" <=> M <= N

const fs = require('fs');
const data = fs.readFileSync(0); // Buffer
let p = 0;

function skipSpaces() {
  while (p < data.length) {
    const c = data[p];
    if (c !== 10 && c !== 13 && c !== 32 && c !== 9) break; // \n \r space \t
    p++;
  }
}

function nextInt() {
  skipSpaces();
  let sign = 1;
  if (data[p] === 45) { // '-'
    sign = -1;
    p++;
  }
  let num = 0;
  while (p < data.length) {
    const c = data[p];
    if (c < 48 || c > 57) break;
    num = num * 10 + (c - 48);
    p++;
  }
  return num * sign;
}

const N = nextInt();
const M = nextInt();

// 간선 정보는 판별에 필요 없음 (M <= N 인지만 보면 됨)
console.log(M <= N ? 'Yes' : 'No');
