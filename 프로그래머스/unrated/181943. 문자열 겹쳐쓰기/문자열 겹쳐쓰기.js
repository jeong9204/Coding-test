function solution(my_string, overwrite_string, s) {
    let myArray = Array.from(my_string);
  for (let idx = 0; idx < overwrite_string.length; idx++) {
    myArray[s + idx] = overwrite_string.charAt(idx);
  }
  return myArray.join("");
}
