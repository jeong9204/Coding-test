function solution(my_string, n) {
    let reverse = [...my_string].reverse()
    return reverse.slice(0, n).reverse().join('');
}