const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

// 입력 처리
const [N, C] = input[0].split(' ').map(Number);
const houses = input.slice(1).map(Number);

// 1. 집 좌표 정렬
houses.sort((a, b) => a - b);

// 2. 이분 탐색 범위 설정
let left = 1; // 최소 거리 후보
let right = houses[N - 1] - houses[0]; // 최대 거리 후보
let answer = 0;

// 3. 이분 탐색 수행
while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  // 현재 mid 거리로 C개 공유기 설치 가능한지 확인
  let count = 1; // 첫 집에 설치
  let last = houses[0];

  for (let i = 1; i < N; i++) {
    if (houses[i] - last >= mid) {
      count++;
      last = houses[i];
    }
  }

  if (count >= C) {
    // 설치 가능 → 더 큰 거리도 탐색
    answer = mid;
    left = mid + 1;
  } else {
    // 설치 불가능 → 거리 줄이기
    right = mid - 1;
  }
}

console.log(answer);
