const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let queue = [];
let result = "";

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const n = parseInt(input[0]); // 첫 번째 줄은 명령 개수
  for (let i = 1; i <= n; i++) {
    const command = input[i].split(" ");
    switch (command[0]) {
      case "push":
        queue.push(parseInt(command[1])); // 큐의 끝에 추가
        break;
      case "pop":
        result += (queue.length ? queue.shift() : -1) + "\n"; // 앞에서 제거
        break;
      case "size":
        result += queue.length + "\n"; // 큐 크기
        break;
      case "empty":
        result += (queue.length ? 0 : 1) + "\n"; // 비어 있는지 확인
        break;
      case "front":
        result += (queue.length ? queue[0] : -1) + "\n"; // 큐의 앞쪽 데이터 확인
        break;
      case "back":
        result += (queue.length ? queue[queue.length - 1] : -1) + "\n"; // 큐의 끝 데이터 확인
        break;
    }
  }
  console.log(result.trim());
});
