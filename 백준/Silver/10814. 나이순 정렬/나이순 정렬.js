const readline = require('readline');

// 입력받기
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const N = parseInt(input[0], 10); // 첫 번째 줄: 회원 수
  const members = [];

  // 두 번째 줄부터 회원 정보 파싱
  for (let i = 1; i <= N; i++) {
    const [age, name] = input[i].split(' ');
    members.push({ age: parseInt(age, 10), name, index: i });
  }

  // 정렬: 나이 순으로, 같으면 가입 순으로
  members.sort((a, b) => {
    if (a.age === b.age) {
      return a.index - b.index; // 가입 순서로 정렬
    }
    return a.age - b.age; // 나이 순으로 정렬
  });

  // 결과 출력
  const result = members.map((member) => `${member.age} ${member.name}`);
  console.log(result.join('\n'));
});
