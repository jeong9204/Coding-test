const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  // 입력 처리
  const N = Number(input[0]); // A 배열의 크기
  const A = input[1].split(" ").map(Number); // A 배열
  const M = Number(input[2]); // 찾을 숫자의 개수
  const queries = input[3].split(" ").map(Number); // 찾을 숫자들

  // A 배열 정렬 (이진 탐색을 위해)
  A.sort((a, b) => a - b);

  // 이진 탐색 함수 정의
  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] === target) {
        return 1; // 존재함
      } else if (arr[mid] < target) {
        left = mid + 1; // 오른쪽으로 탐색
      } else {
        right = mid - 1; // 왼쪽으로 탐색
      }
    }

    return 0; // 존재하지 않음
  };

  // 각 쿼리에 대해 이진 탐색 수행
  const results = queries.map((query) => binarySearch(A, query));

  // 결과 출력
  console.log(results.join("\n"));
});
