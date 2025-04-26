const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const [L, C] = input[0].split(' ').map(Number);
  const chars = input[1].split(' ').sort(); // 알파벳을 사전순으로 정렬
  
  const vowels = ['a', 'e', 'i', 'o', 'u']; // 모음 리스트
  const result = [];

  function dfs(start, path) {
    if (path.length === L) {
      // 모음, 자음 개수 세기
      let vowelCount = 0;
      let consonantCount = 0;
      for (const char of path) {
        if (vowels.includes(char)) vowelCount++;
        else consonantCount++;
      }
      // 조건 만족하면 결과에 추가
      if (vowelCount >= 1 && consonantCount >= 2) {
        result.push(path.join(''));
      }
      return;
    }

    for (let i = start; i < C; i++) {
      path.push(chars[i]);
      dfs(i + 1, path);
      path.pop(); // 백트래킹
    }
  }

  dfs(0, []);

  console.log(result.join('\n'));
});
