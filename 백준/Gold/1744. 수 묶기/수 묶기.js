// BOJ 1744 수 묶기 - Node.js 풀이

const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

const N = Number(input[0].trim());
const numbers = input.slice(1).map(line => Number(line.trim()));

const positives = []; // 2 이상 양수
let onesCount = 0;    // 1의 개수
const negatives = []; // 음수들
let zeroCount = 0;    // 0의 개수

for (const num of numbers) {
  if (num > 1) {
    // 2 이상 양수는 곱할 후보
    positives.push(num);
  } else if (num === 1) {
    // 1은 무조건 더하는 게 이득
    onesCount++;
  } else if (num === 0) {
    // 0은 나중에 음수 하나를 상쇄하는 데 사용 가능
    zeroCount++;
  } else {
    // 음수
    negatives.push(num);
  }
}

let sum = 0;

// 1. 양수(2 이상) 처리: 내림차순 정렬 후, 큰 수끼리 곱하기
positives.sort((a, b) => b - a); // 예: [5,4,3,2]

for (let i = 0; i < positives.length; i += 2) {
  if (i + 1 < positives.length) {
    // 두 개씩 묶어서 곱하기
    sum += positives[i] * positives[i + 1];
  } else {
    // 하나 남으면 그냥 더한다
    sum += positives[i];
  }
}

// 2. 1 처리: 전부 그냥 더하기
sum += onesCount; // 1 * 개수 = 개수만큼 더하면 됨

// 3. 음수 처리: 오름차순 정렬 후, 두 개씩 곱하기
negatives.sort((a, b) => a - b); // 예: [-5,-4,-1]

for (let i = 0; i < negatives.length; i += 2) {
  if (i + 1 < negatives.length) {
    // 두 개씩 묶어서 곱한다 (음수 * 음수 = 양수)
    sum += negatives[i] * negatives[i + 1];
  } else {
    // 하나 남은 음수
    if (zeroCount > 0) {
      // 0이 있으면 이 음수를 0과 묶어서 없애버릴 수 있다 (합에 더하지 않음)
      // sum += negatives[i] * 0; 와 같으니, 굳이 안 더함
      zeroCount--;
    } else {
      // 0도 없으면 어쩔 수 없이 그냥 더해야 한다
      sum += negatives[i];
    }
  }
}

console.log(sum);
