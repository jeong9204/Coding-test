const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("", (S) => {
  const result = Array(26).fill(-1);  // a부터 z까지 26개의 위치를 -1로 초기화

  for (let i = 0; i < S.length; i++) {
    const charCode = S.charCodeAt(i) - 97;  // 현재 문자의 알파벳 순서를 얻음 ('a'는 97)
    if (result[charCode] === -1) {
      result[charCode] = i;  // 문자가 처음 등장한 위치 저장
    }
  }

  console.log(result.join(" "));  // 결과를 공백으로 구분하여 출력
  rl.close();
});
