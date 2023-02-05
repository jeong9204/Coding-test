function solution(numlist, n) {
  let difference = numlist.map(num => num - n);
  let distance = numlist.map(num => (num - n >= 0) ? (num - n) : (n - num));
  distance.sort((a, b) => a - b);

  for (let i = 0; i < distance.length - 1; i++) {
    if (distance[i] === distance[i + 1]) {
      distance[i + 1] = -distance[i];
    }
  }

  for (let i = 0; i < distance.length; i++) {
    if (!difference.includes(distance[i])) {
      distance[i] = -distance[i];
    }
  }

  let answer = distance.map(d => d + n);

  return answer;
}