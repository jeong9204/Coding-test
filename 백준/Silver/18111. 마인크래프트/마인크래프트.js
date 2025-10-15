// BOJ 18111 - 마인크래프트 (땅 고르기)
// Node.js (ECMAScript 2021)

const fs = require('fs');

// 입력 파싱: 공백 기준으로 전부 나눠 빠르게 가져오기
const data = fs.readFileSync(0, 'utf8').trim().split(/\s+/).map(Number);
let idx = 0;

const N = data[idx++];        // 세로
const M = data[idx++];        // 가로
const B = data[idx++];        // 초기 인벤토리 블록 수
const totalCells = N * M;

// 높이 값들 읽기 & 높이별 빈도 계산(0~256)
const count = new Array(257).fill(0);
let minH = 256;
let maxH = 0;

for (let i = 0; i < totalCells; i++) {
  const h = data[idx++];
  count[h]++;
  if (h < minH) minH = h;
  if (h > maxH) maxH = h;
}

// 최적 결과 초기화
let bestTime = Number.POSITIVE_INFINITY;
let bestHeight = -1;

// 목표 높이 H를 0~256 모두 시도(문제 조건상 이 범위가 보장)
for (let H = 0; H <= 256; H++) {
  let remove = 0; // 제거해야 할 블록 총합
  let add = 0;    // 설치해야 할 블록 총합

  // 높이별 빈도를 이용해 제거/설치량 계산
  // i > H: (i-H)만큼 제거 → 시간 2초/개, 인벤토리 + (i-H)
  // i < H: (H-i)만큼 설치 → 시간 1초/개, 인벤토리 - (H-i)
  for (let i = 0; i <= 256; i++) {
    const c = count[i];
    if (c === 0) continue;

    if (i > H) {
      remove += (i - H) * c;
    } else if (i < H) {
      add += (H - i) * c;
    }
  }

  // 인벤토리 검증: 시작 B + 제거량(remove) >= 설치량(add)
  if (B + remove < add) {
    continue; // 불가능한 높이 → 스킵
  }

  // 총 시간 계산
  const time = remove * 2 + add * 1;

  // 더 나은 답인지 갱신 (시간 최소 / 같으면 높이 최대)
  if (time < bestTime || (time === bestTime && H > bestHeight)) {
    bestTime = time;
    bestHeight = H;
  }
}

console.log(`${bestTime} ${bestHeight}`);
