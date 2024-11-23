const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const n = parseInt(input[0]); // 단어의 개수
  const words = input.slice(1); // 단어 목록

  let groupWordCount = 0;

  for (const word of words) {
    if (isGroupWord(word)) {
      groupWordCount++;
    }
  }

  console.log(groupWordCount);

  function isGroupWord(word) {
    const seen = new Set(); // 이미 확인한 문자 저장
    let lastChar = null;

    for (const char of word) {
      if (char !== lastChar) {
        // 새로운 문자가 나타났을 때
        if (seen.has(char)) {
          // 이전에 나왔던 문자라면 그룹 단어가 아님
          return false;
        }
        seen.add(char); // 새로운 문자 추가
        lastChar = char; // 마지막 문자 갱신
      }
    }
    return true; // 그룹 단어임
  }
});
