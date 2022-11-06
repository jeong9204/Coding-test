function solution(s) {
    return !isNaN(+s) && (s.length === 4 || s.length === 6) && !s.match(/[a-z]/ig)
}