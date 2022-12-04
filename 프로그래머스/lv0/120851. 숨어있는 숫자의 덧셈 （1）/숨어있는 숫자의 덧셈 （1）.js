function solution(my_string) {
    var answer = my_string.replace(/[a-z]/ig,"");
    return [...answer].reduce((a,b) => +a + +b);
}