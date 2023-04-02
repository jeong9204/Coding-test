function solution(n, words) {
  const list = [];
  let idx = 0;
  list.push(words[0]);

  for (let i = 1; i < words.length; i++) {
    if (!list.includes(words[i])) {
      const beforeWord = list[idx];
      if (beforeWord.charAt(beforeWord.length - 1) !== words[i].charAt(0)) {
        return fail(n, i);
      }
      idx++;
      list.push(words[i]);
    } else {
      return fail(n, i);
    }
  }

  return [0, 0];
}

function fail(n, i) {
  const order = Math.floor(i / n) + 1;
  const num = (i % n) + 1;
  return [num, order];
}