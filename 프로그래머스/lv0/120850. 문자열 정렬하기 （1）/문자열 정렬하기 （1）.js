function solution(my_string) {
    return [...my_string.replace(/[a-z]/ig,'')].map(Number).sort((a,b) => a-b);
}