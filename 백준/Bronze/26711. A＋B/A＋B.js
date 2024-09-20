const readline = require('readline');

// 두 문자열을 더해주는 함수
function sumString(strA, strB) {
  let tempStr = '';

  // 두 문자열 중에서 가장 긴 길이를 찾음
  const maxLength = Math.max(strA.length, strB.length);

  // 문자열을 뒤집어 줌
  strA = strA.split('').reverse().join('');
  strB = strB.split('').reverse().join('');

  // 뒤집은 두 문자열의 인덱스를 맞춤
  while (strA.length < maxLength) strA += '0';
  while (strB.length < maxLength) strB += '0';

  let up = 0;

  // 같은 인덱스의 char를 int로 변환하고 더함. 올림 처리는 `up` 변수 사용
  for (let i = 0; i < maxLength; i++) {
    const tempOne = i < strA.length ? parseInt(strA[i]) : 0;
    const tempTwo = i < strB.length ? parseInt(strB[i]) : 0;
    let tempThree = tempOne + tempTwo + up;
    up = 0;

    if (tempThree >= 10) {
      tempThree -= 10;
      up = 1;
    }

    tempStr += tempThree;
  }

  if (up === 1) tempStr += '1'; // 올림이 남아있다면 추가
  return tempStr.split('').reverse().join(''); // 더한 값을 뒤집어 줌
}

// 입력 처리
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('', (tempOne) => {
  rl.question('', (tempTwo) => {
    console.log(sumString(tempOne, tempTwo));
    rl.close();
  });
});
