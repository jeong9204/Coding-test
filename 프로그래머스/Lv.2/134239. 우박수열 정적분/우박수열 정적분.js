function solution(k, ranges) {
  const integral = [0];
  // 우박수열 정적분 값 초기화
  while (k !== 1) {
    if (k % 2) {
      integral.push((k + k * 3 + 1) / 2 + integral.at(-1));
      k = k * 3 + 1;
    } else {
      integral.push((k * 3) / 4 + integral.at(-1));
      k /= 2;
    }
  }
  return ranges.map(([s, e]) => {
    // 끝 인덱스가 시작 인덱스보다 작은 경우
    if (integral.length - 1 + e < s) return -1;
    // 일반 케이스
    return integral.at(e - 1) - integral[s];
  });
}