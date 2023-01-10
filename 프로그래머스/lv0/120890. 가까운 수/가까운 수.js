function solution(array, n) {
    let arr = array.sort((a,b) => a-b);
    const temp = Math.min(...arr.map(number => Math.abs(number - n)));
    return array.find(number => Math.abs(number - n) === temp);
}