function solution(polynomial) {
    const arrPolynomial = polynomial.split(" ");
  let arrX = arrPolynomial
    .filter((v) => v.includes("x"))
    .map((v) => (v.split("x")[0] ? v.split("x")[0] : "1"));
  let num = arrPolynomial.filter((v) => +v);

  if (arrX.length && num.length) {
    arrX = arrX.reduce((a, b) => +a + +b);
    num = num.reduce((a, b) => +a + +b);
    if (arrX === "1") arrX = "";
    return `${arrX + ""}x + ${num + ""}`;
  } else {
    if (arrX.length) {
      arrX = arrX.reduce((a, b) => +a + +b);
      if (arrX === "1") arrX = "";
      return `${arrX + ""}x`;
    }
    if (num.length) {
      num = num.reduce((a, b) => +a + +b);
      return num + "";
    }
  }
}