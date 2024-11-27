// readline 모듈을 사용해 입력을 처리합니다.
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = []; // 입력 데이터를 저장할 배열입니다.

// 입력 데이터를 줄 단위로 배열에 저장합니다.
rl.on('line', (line) => {
  input.push(line);
});

// 모든 입력이 완료되면 실행되는 코드입니다.
rl.on('close', () => {
  const testCaseCount = parseInt(input[0], 10); // 첫 줄은 테스트 케이스 개수입니다.
  const results = input.slice(1, testCaseCount + 1); // 테스트 케이스 문자열들을 가져옵니다.
  
  const scores = results.map((result) => {
    let score = 0; // 총 점수
    let consecutive = 0; // 연속된 O의 개수를 추적합니다.
    
    for (const char of result) {
      if (char === 'O') {
        consecutive += 1; // O를 만나면 연속 점수를 증가시킵니다.
        score += consecutive; // 현재 점수를 누적합니다.
      } else {
        consecutive = 0; // X를 만나면 연속 점수를 초기화합니다.
      }
    }
    return score; // 해당 결과 문자열의 점수를 반환합니다.
  });

  // 각 테스트 케이스의 점수를 한 줄씩 출력합니다.
  scores.forEach((score) => console.log(score));
});
