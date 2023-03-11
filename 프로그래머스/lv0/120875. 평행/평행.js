function solution(dots) {
  const [a, b, c, d] = dots;

  const checkParallel = (p1, p2, p3, p4) => {
    // 두 직선이 서로 평행한 경우
    return (p2[0] - p1[0]) * (p4[1] - p3[1]) === (p4[0] - p3[0]) * (p2[1] - p1[1]);
  }

  // 3가지 쌍으로 묶어서 체크합니다.
  return checkParallel(a, b, c, d) || checkParallel(a, c, b, d) || checkParallel(a, d, b, c) ? 1 : 0;
}
