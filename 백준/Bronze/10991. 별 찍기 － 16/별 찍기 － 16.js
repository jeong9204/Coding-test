const fs = require('fs');
const N = Number(fs.readFileSync(0, 'utf8').trim());

let out = [];
for (let i = 1; i <= N; i++) {
  const leading = ' '.repeat(N - i);
  // 별 i개를 공백으로 구분해 출력, 줄 끝 공백은 없도록 join 사용
  const stars = Array(i).fill('*').join(' ');
  out.push(leading + stars);
}
console.log(out.join('\n'));
