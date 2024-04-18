function solution(clockHands) {
  let answer = Infinity;

  const len = clockHands.length;

  // 해당 값을 회전시킨 결과 값 반환
  const rotate = (idx, a) => {
    idx += a;
    if (idx < 0) return idx + 4;
    if (idx > 3) return idx - 4;
    return idx;
  };

  // 상, 하, 좌, 우, 중 5개 값을 a만큼 회전
  const rotatePlus = (x, y, table, a) => {
    const targets = [
      [x, y],
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [tx, ty] of targets) {
      if (tx < 0 || tx >= len || ty < 0 || ty >= len) continue;
      table[tx][ty] = rotate(table[tx][ty], a);
    }
  };

  // 퍼즐이 풀렸는지 확인
  const isSolved = (table) => {
    // 마지막 전까지는 모두 0으로 만들었으므로 마지막 행만 판별
    const checker = table[len - 1].reduce((sum, cel) => sum + cel, 0);
    return checker === 0;
  };

  // 첫번째 줄 조작 이후 후처리, 결과값 갱신
  const postProcess = (table, count) => {
    let result = count;
    for (let x = 1; x < len; x++) {
      for (let y = 0; y < len; y++) {
        const key = table[x - 1][y] ? 4 - table[x - 1][y] : 0;
        rotatePlus(x, y, table, key);
        result += key;
      }
    }
    if (isSolved(table)) answer = Math.min(answer, result);
  };

  const setTable = (y, table, c) => {
    const newTable = table.map((v) => [...v]);
    rotatePlus(0, y, newTable, c);
    return newTable;
  };

  // 첫번째 줄 조작 (조작 안함, 우측 회전, 좌측 회전, 180도 회전)후 후처리 호출
  const dfs = (y, count, table) => {
    if (y === len) return postProcess(table, count);
    const cases = [0, 1, 2, 3];
    for (const c of cases) dfs(y + 1, count + c, setTable(y, table, c));
  };

  dfs(0, 0, clockHands);
  return answer;
}
