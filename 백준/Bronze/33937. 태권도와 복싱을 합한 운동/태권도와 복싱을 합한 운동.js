const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const vowels = new Set(['a', 'e', 'i', 'o', 'u']);

function getFirstSyllable(word) {
  let firstVowelIndex = -1;

  // 1. 첫 번째 모음 찾기
  for (let i = 0; i < word.length; i++) {
    if (vowels.has(word[i])) {
      firstVowelIndex = i;
      break;
    }
  }

  if (firstVowelIndex === -1) return null; // 모음이 없다면 첫음절 없음

  // 2. 그 뒤에 첫 자음 찾기
  let firstConsonantIndex = -1;
  for (let i = firstVowelIndex + 1; i < word.length; i++) {
    if (!vowels.has(word[i])) {
      firstConsonantIndex = i;
      break;
    }
  }

  if (firstConsonantIndex === -1) return null; // 자음이 없다면 첫음절 없음

  // 3. 자음 포함하지 않는 접두사 → 자음 앞까지
  return word.slice(0, firstConsonantIndex);
}

const input = [];
rl.on('line', line => {
  input.push(line.trim());
  if (input.length === 2) {
    const [A, B] = input;

    const firstSyllableA = getFirstSyllable(A);
    const firstSyllableB = getFirstSyllable(B);

    if (!firstSyllableA || !firstSyllableB) {
      console.log('no such exercise');
    } else {
      console.log(firstSyllableA + firstSyllableB);
    }

    rl.close();
  }
});
