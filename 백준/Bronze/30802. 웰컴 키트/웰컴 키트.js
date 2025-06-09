const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on('line', line => input.push(line)).on('close', () => {
  const N = Number(input[0]);
  const shirtCounts = input[1].split(' ').map(Number); // [S, M, L, XL, XXL, XXXL]
  const [T, P] = input[2].split(' ').map(Number); // T장씩, P자루씩

  // 1️⃣ 티셔츠 묶음 수 계산
  let totalBundles = 0;
  for (const count of shirtCounts) {
    // count명을 만족시키려면 최소 몇 묶음? => 올림 계산
    totalBundles += Math.ceil(count / T);
  }

  // 2️⃣ 펜 묶음 수 계산
  const penBundles = Math.floor(N / P); // 최대한 P자루씩 몇 묶음?
  const remainingPens = N % P; // 나머지는 낱개로

  // 출력
  console.log(totalBundles);
  console.log(`${penBundles} ${remainingPens}`);
});
