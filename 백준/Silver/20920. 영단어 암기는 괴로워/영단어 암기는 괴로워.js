const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', line => {
  input.push(line.trim());
}).on('close', () => {
  const [N, M] = input[0].split(' ').map(Number);
  const wordCount = {};

  for (let i = 1; i <= N; i++) {
    const word = input[i];
    if (word.length >= M) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }

  const result = Object.entries(wordCount)
    .sort((a, b) => {
      const [wordA, freqA] = a;
      const [wordB, freqB] = b;

      if (freqA !== freqB) {
        return freqB - freqA; // 1. 빈도 내림차순
      } else if (wordA.length !== wordB.length) {
        return wordB.length - wordA.length; // 2. 길이 내림차순
      } else {
        return wordA.localeCompare(wordB); // 3. 사전순 오름차순
      }
    })
    .map(entry => entry[0]);

  console.log(result.join('\n'));
});
