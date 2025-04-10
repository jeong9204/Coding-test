const fs = require("fs");
const input = fs.readFileSync("/dev/stdin", "utf8").trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const city = input.slice(1).map(line => line.split(" ").map(Number));

const houses = [];
const chickens = [];

// 집과 치킨집 위치 수집
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    if (city[r][c] === 1) houses.push([r, c]);
    else if (city[r][c] === 2) chickens.push([r, c]);
  }
}

// 조합 구하기
function getCombinations(arr, select) {
  const result = [];
  const comb = (start, selected) => {
    if (selected.length === select) {
      result.push([...selected]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      comb(i + 1, selected);
      selected.pop();
    }
  };
  comb(0, []);
  return result;
}

// 거리 계산 함수
function getChickenDistance(selectedChickens) {
  let total = 0;
  for (const [hr, hc] of houses) {
    let minDist = Infinity;
    for (const [cr, cc] of selectedChickens) {
      const dist = Math.abs(hr - cr) + Math.abs(hc - cc);
      minDist = Math.min(minDist, dist);
    }
    total += minDist;
  }
  return total;
}

// 최소 치킨 거리 탐색
let minDistance = Infinity;
const combinations = getCombinations(chickens, M);
for (const comb of combinations) {
  const dist = getChickenDistance(comb);
  minDistance = Math.min(minDistance, dist);
}

console.log(minDistance);
