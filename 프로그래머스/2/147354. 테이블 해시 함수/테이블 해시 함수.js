function solution(data, col, row_begin, row_end) {
  let answer = 0;
  data.sort((a, b) => {
    if (a[col-1] - b[col-1] < 0) return -1;
    if (a[col-1] - b[col-1] > 0) return 1;
    return b[0] - a[0];
  });
  for (let i = row_begin; i <= row_end; i++) answer ^= data[i - 1].reduce((a, c) => a + (c % i), 0);
  return answer;
}