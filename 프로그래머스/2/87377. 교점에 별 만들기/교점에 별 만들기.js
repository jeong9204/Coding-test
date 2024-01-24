function solution(line) {
  const result = [];
  let [maxH, minH, maxW, minW] = [-Infinity, Infinity, -Infinity, Infinity];
  line.forEach(([a, b, e], i) => {
    for (let j = i + 1; j < line.length; j++) {
      const [c, d, f] = line[j];
      const mod = a * d - b * c;
      if (mod === 0) continue; // 분모가 0인 경우 -> 서로 평행하거나 일치

      const xNum = b * f - e * d;
      const yNum = e * c - a * f;
      if (xNum % mod || yNum % mod) continue; // 정수가 아닌 교차점

      const [x, y] = [xNum / mod, yNum / mod];
      result.push([x, y]); // 교차점 추가
      maxW = Math.max(x, maxW);
      minW = Math.min(x, minW);
      maxH = Math.max(y, maxH);
      minH = Math.min(y, minH);
    }
  });
  // 테이블 초기화
  const table = new Array(maxH - minH + 1)
    .fill(null)
    .map(() => new Array(maxW - minW + 1).fill(null).map(() => "."));
  // 별찍기
  result.forEach(([x, y]) => (table[maxH - y][x - minW] = "*"));
  return table.map((v) => v.join(""));
}