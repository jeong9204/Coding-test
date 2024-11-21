// 필요한 모듈 사용 (Node.js 내장 모듈)
const readline = require('readline');

// 입력을 처리하기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  // 입력받은 단어를 대문자로 변환
  const word = input.toUpperCase();

  // 알파벳 빈도수 저장을 위한 Map 객체 생성
  const frequencyMap = new Map();

  // 각 문자에 대해 빈도 계산
  for (const char of word) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  // 최대 빈도와 빈도에 해당하는 알파벳 찾기
  let maxFrequency = 0;
  let maxChar = '';
  let isDuplicate = false;

  for (const [char, frequency] of frequencyMap) {
    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      maxChar = char;
      isDuplicate = false; // 새로운 최대값이 발견되면 중복 여부 초기화
    } else if (frequency === maxFrequency) {
      isDuplicate = true; // 최대값이 중복되면 플래그 설정
    }
  }

  // 결과 출력
  if (isDuplicate) {
    console.log('?');
  } else {
    console.log(maxChar);
  }

  rl.close(); // 입력 종료
});
