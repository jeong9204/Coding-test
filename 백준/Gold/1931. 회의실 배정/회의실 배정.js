const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const N = parseInt(input[0]); // 회의의 수
  const meetings = input.slice(1).map((line) => {
    const [start, end] = line.split(" ").map(Number);
    return { start, end };
  });

  // 1. 회의 정렬: 끝나는 시간 -> 시작 시간 순으로 정렬
  meetings.sort((a, b) => {
    if (a.end === b.end) {
      return a.start - b.start;
    }
    return a.end - b.end;
  });

  // 2. 그리디 알고리즘으로 최대 회의 개수 계산
  let count = 0;
  let lastEndTime = 0;

  for (const meeting of meetings) {
    if (meeting.start >= lastEndTime) {
      count++; // 회의를 선택
      lastEndTime = meeting.end; // 끝나는 시간을 업데이트
    }
  }

  console.log(count);
});
