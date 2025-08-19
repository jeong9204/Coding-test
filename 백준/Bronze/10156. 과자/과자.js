// BOJ 10156 과자
// 입력: K N M
// 출력: max(0, K*N - M)

const fs = require('fs');

const [K, N, M] = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
const need = K * N - M;
console.log(need > 0 ? need : 0);
