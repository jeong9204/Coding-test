const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const N = parseInt(input[0]); // 첫 줄에 주어진 단어의 개수
  const words = input.slice(1); // 나머지 줄에 주어진 단어들
  
  // Set을 사용하여 중복 단어 제거
  const uniqueWords = [...new Set(words)];
  
  // 정렬: 길이가 짧은 것 우선, 길이가 같으면 사전 순
  uniqueWords.sort((a, b) => {
    if (a.length === b.length) {
      return a.localeCompare(b); // 사전 순 정렬
    }
    return a.length - b.length; // 길이로 정렬
  });

  // 결과 출력
  console.log(uniqueWords.join("\n"));
});
