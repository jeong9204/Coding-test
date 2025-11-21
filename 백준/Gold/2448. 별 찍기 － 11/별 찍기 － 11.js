// BOJ 2448: 별 찍기 - 11 (프랙탈 삼각형)
// Node.js 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const N = Number(input);

// 전체 캔버스 크기
const height = N;
const width = 2 * N - 1;

// 공백으로 초기화된 2차원 배열 생성
const arr = Array.from({ length: height }, () =>
  Array(width).fill(' ')
);

// (r, c)를 꼭짓점으로 하는 높이 n 삼각형 그리기
function draw(r, c, n) {
  if (n === 3) {
    // 베이스 삼각형 (높이 3)
    arr[r][c] = '*';
    arr[r + 1][c - 1] = '*';
    arr[r + 1][c + 1] = '*';
    for (let i = -2; i <= 2; i++) {
      arr[r + 2][c + i] = '*';
    }
    return;
  }

  const h = n / 2;

  // 위쪽 작은 삼각형
  draw(r, c, h);
  // 왼쪽 아래 작은 삼각형
  draw(r + h, c - h, h);
  // 오른쪽 아래 작은 삼각형
  draw(r + h, c + h, h);
}

// 전체 큰 삼각형의 꼭짓점은 첫 줄 가운데
draw(0, Math.floor(width / 2), N);

// 출력 문자열로 변환
const output = arr.map(row => row.join('')).join('\n');
console.log(output);
