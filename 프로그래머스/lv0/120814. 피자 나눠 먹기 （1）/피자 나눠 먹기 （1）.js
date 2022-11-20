function solution(n) {
    return n<7 ? 1 : n%7 ===0 ? parseInt(n/7) : parseInt((n/7) + 1);
}