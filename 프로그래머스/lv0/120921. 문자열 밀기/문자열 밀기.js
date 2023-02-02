function solution(A, B) {
    if (A === B) return 0;
  let arrA = [...A];
  let arrB = [...B];
  let count = 0;
  for (let i = 0; i < A.length; i++) {
    let result = '';
    count++;
    result += arrA[A.length - 1]; 
    arrA.forEach((letter, i) => {
      if (i < A.length - 1) result += letter;
    });
    arrA = result.split('');
    if (result === arrB.join('')) {
      return count;
    }
  }
  return count === arrA.length ? -1 : count;
}