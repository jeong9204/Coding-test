const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const T = parseInt(input[0], 10); // 테스트 케이스 개수
  let index = 1;
  let results = [];

  for (let t = 0; t < T; t++) {
    const [N, M] = input[index].split(' ').map(Number); // 문서 개수, 목표 문서 위치
    const priorities = input[index + 1].split(' ').map(Number); // 중요도 리스트
    index += 2;

    // 문서를 [인덱스, 중요도] 형태로 큐에 저장
    let queue = priorities.map((priority, idx) => [idx, priority]);
    let printCount = 0;

    while (queue.length > 0) {
      // 현재 문서
      let current = queue.shift();
      
      // 현재 문서보다 중요도가 높은 문서가 있는지 확인
      if (queue.some(doc => doc[1] > current[1])) {
        queue.push(current); // 중요도가 높은 문서가 있으면 뒤로 보냄
      } else {
        // 인쇄됨
        printCount++;
        if (current[0] === M) {
          results.push(printCount);
          break;
        }
      }
    }
  }

  console.log(results.join('\n'));
});
