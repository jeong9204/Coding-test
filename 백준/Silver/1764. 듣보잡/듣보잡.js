const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number); // 듣도 못한 사람 수, 보도 못한 사람 수
  const unheardSet = new Set(input.slice(1, N + 1)); // 듣도 못한 사람 명단
  const unseenSet = new Set(input.slice(N + 1, N + M + 1)); // 보도 못한 사람 명단

  // 교집합 구하기 (듣보잡 명단)
  const unheardUnseen = [...unheardSet].filter(name => unseenSet.has(name));

  // 사전순 정렬
  unheardUnseen.sort();

  // 출력
  console.log(unheardUnseen.length);
  console.log(unheardUnseen.join('\n'));
});
