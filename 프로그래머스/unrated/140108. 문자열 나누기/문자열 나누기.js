function solution(s) {
  let count = 0;
  let x = s[0];
  let left = 1;
  let right = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] === x) {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      count++;
      x = s[i + 1];
      left = 0;
      right = 0;
    }
  }

  if (left !== right) {
    count++;
  }

  return count;
}
