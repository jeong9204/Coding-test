const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = [];

rl.on('line', line => {
  input.push(line.trim());
  if (input.length === 4) rl.close(); // 4개 역 정보만 입력받으면 종료
}).on('close', () => {
  let current = 0; // 현재 기차 안 인원
  let maxPeople = 0; // 최대 인원

  for (let i = 0; i < 4; i++) {
    const [out, _in] = input[i].split(' ').map(Number);

    current -= out;  // 먼저 내리고
    current += _in;  // 그 다음 탑승

    if (current > maxPeople) {
      maxPeople = current; // 최대 인원 갱신
    }
  }

  console.log(maxPeople);
});
