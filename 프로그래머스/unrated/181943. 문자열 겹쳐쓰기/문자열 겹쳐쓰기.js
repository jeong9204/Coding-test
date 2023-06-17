function solution(my_string, overwrite_string, s) {
    let myArray = Array.from(my_string);
  for (let idx = 0; idx < overwrite_string.length; idx++) {
    myArray[s + idx] = overwrite_string.charAt(idx);
  }
  return myArray.join("");
}

// 이 자바스크립트 코드는 주어진 문자열(myString)을 배열로 변환한 후, overwriteString을 해당 위치에 덮어쓰는 함수입니다. myString을 배열로 변환하기 위해 Array.from() 메서드를 사용합니다. 그런 다음 overwriteString의 각 문자를 반복하면서 myArray의 해당 위치에 덮어쓰게 됩니다. 마지막으로 join() 메서드를 사용하여 배열을 다시 문자열로 변환한 후, 결과를 반환합니다.

// 주의할 점으로는 자바스크립트에서는 0부터 시작하는 인덱스를 사용한다는 것입니다. 따라서 반복문의 인덱스(idx)는 0부터 overwriteString.length - 1까지 증가합니다. 또한, 문자열에서 개별 문자에 접근하기 위해 charAt() 메서드를 사용합니다.